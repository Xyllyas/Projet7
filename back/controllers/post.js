const Post = require('../model/Post')
const fs = require('fs');
const dayjs = require('dayjs');
const jwt = require("jsonwebtoken");

exports.postpost = (req, res, next) => {
    const postObject = req.body;
    delete postObject._id;
    if (req.body.text === '' && req.file === undefined) {
        res.status(400).json({ message: 'erreur' })
    }
    else if (req.file === undefined) {
        const post = new Post({
            ...postObject,
            likes: 0,
            dislikes: 0,
            userLiked: [],
            userDisliked: [],
            comment: [],
            date: dayjs().format("DD/MM/YYYY H:mm").toString()
        });
        post.save()
            .then(() => res.status(200).json({ message: "post enregistré :" }))
            .catch((error) => { res.status(400).json({ error }) });
    } else {
        const post = new Post({
            ...postObject,
            likes: 0,
            dislikes: 0,
            userLiked: [],
            userDisliked: [],
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            comment: [],
            date: dayjs().format("	DD/MM/YYYY HH:mm").toString()
        });
        post.save()
            .then(() => res.status(200).json({ message: "post enregistré :" }))
            .catch((error) => { res.status(400).json({ error }) });
    }
};
exports.getAllpost = (req, res, next) => {
    Post.find()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => res.status(400).json({ error }));
}

exports.modifypost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const role = decodedToken.role;
    const userId = decodedToken.userId;


    Post.findOne({ _id: req.params.id }).then((post) => {
        if (role === 'admin' || post.userId === userId) {
            if (req.file !== undefined || post.imageUrl) {
                if (post.imageUrl) {
                    if (req.file !== undefined) {
                        const filename = post.imageUrl.split("/images/")[1];
                        fs.unlink(`images/${filename}`, () => {
                            Post.updateOne(
                                { _id: req.params.id },
                                {
                                    ...req.body,
                                    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                                    _id: req.params.id
                                }
                            )
                                .then(() => res.status(200).json({ message: "post modifiée !" }))
                                .catch((error) => res.status(400).json({ error }));
                        })

                    } else {
                        Post.updateOne(
                            { _id: req.params.id },
                            {

                                ...req.body,
                                imageUrl: post.imageUrl,
                                _id: req.params.id
                            }
                        )
                            .then(() => res.status(200).json({ message: "post modifiée !" }))
                            .catch((error) => res.status(400).json({ error }));
                    }

                } else {
                    Post.updateOne(
                        { _id: req.params.id },
                        {

                            ...req.body,
                            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                            _id: req.params.id
                        }
                    )
                        .then(() => res.status(200).json({ message: "post modifiée !" }))
                        .catch((error) => res.status(400).json({ error }));
                }

            } else {
                Post.updateOne(
                    { _id: req.params.id },
                    {
                        ...req.body,
                        $unset: { imageUrl: "" },
                        _id: req.params.id

                    }
                )
                    .then(() => res.status(200).json({ message: "post modifiée !" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        }
    });
};

exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const role = decodedToken.role;
    const userId = decodedToken.userId;

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (role === 'admin' || userId === post.userId) {
                if (!post.imageUrl) {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Post supprimé !" }))
                        .catch((error) => res.status(400).json({ error }));
                } else {
                    const filename = post.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                        Post.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: "Post supprimé !" }))
                            .catch((error) => res.status(400).json({ error }));
                    });
                }
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.likePost = (req, res, next) => {
    const postId = req.params.id
    const userId = req.body.userId;
    const like = req.body.like;
    Post.findOne({ _id: postId })
        .then((post) => {
            if ((post.userLiked.includes(userId) || post.userDisliked.includes(userId)) && like !== 0) {
                res.status(200).json({ message: 'utilisateur à déja donné son avis' })
            } else {

                switch (like) {
                    case 1:
                        Post.updateOne(
                            { _id: postId },
                            {
                                $inc: { likes: 1 },
                                $push: { userLiked: userId }
                            }
                        )
                            .then(() => res.status(200).json({ message: 'Post liked!' }))
                            .catch(err => res.status(500).json({ err }));
                        break;
                    case 0:
                        Post.findOne({ _id: postId })
                            .then((post) => {
                                if (post.userLiked.includes(userId)) {
                                    Post.updateOne(
                                        { _id: postId },
                                        {
                                            $inc: { likes: -1 },
                                            $pull: { userLiked: userId }
                                        }
                                    )
                                        .then(() => res.status(200).json({ message: 'like remove' }))
                                        .catch((err) => res.status(500).json({ err }));
                                }
                            })
                            .catch((err) => res.status(500).json({ err }));
                        break;
                }
            }
        })
};
