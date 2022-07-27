const Comment = require('../model/Comment')
const Post = require('../model/Post')
const jwt = require("jsonwebtoken");

exports.postComment = (req, res, next) => {
  function strRandom(o) {
    var a = 10,
      b = 'abcdefghijklmnopqrstuvwxyz',
      c = '',
      d = 0,
      e = '' + b;
    if (o) {
      if (o.startsWithLowerCase) {
        c = b[Math.floor(Math.random() * b.length)];
        d = 1;
      }
      if (o.length) {
        a = o.length;
      }
      if (o.includeUpperCase) {
        e += b.toUpperCase();
      }
      if (o.includeNumbers) {
        e += '1234567890';
      }
    }
    for (; d < a; d++) {
      c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
  }

  const commentObject = req.body;
  const comment = new Comment({
    ...commentObject,
    commentId: strRandom({
      includeUpperCase: true,
      includeNumbers: true,
      length: 100,
      startsWithLowerCase: true
    })
  })
  Post.updateOne(
    { _id: req.params.id },
    {
      $push: { comments: comment }
    }
  )
    .then(() => res.status(200).json({ message: 'Commentaire ajouté' }))
    .catch(err => res.status(500).json({ err }));
}
// 
exports.modifyComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const role = decodedToken.role;
  const userId = decodedToken.userId;

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (role === 'admin') {
        Post.updateOne(
          { _id: req.params.id, "comments.commentId": req.params.commentId },
          { $set: { "comments.$.text": req.body.text } }
        ).then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        for (let i = 0; i < post.comments.length; i++) {
          if (post.comments[i].commentId === req.params.commentId) {
            if (post.comments[i].userId === userId) {
              Post.updateOne(
                { _id: req.params.id, "comments.commentId": req.params.commentId },
                { $set: { "comments.$.text": req.body.text } }
              ).then(() => res.status(200).json({ message: "Post supprimé !" }))
                .then(() => i = post.comments.length)
                .catch((error) => res.status(400).json({ error }));
            }
          }
        }
      }
    })
}

exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const role = decodedToken.role;
  const userId = decodedToken.userId;

  Post.findOne({ _id: req.params.id })
    .then((post) => {

      if (role === 'admin') {
        Post.updateOne(
          { _id: req.params.id },
          { $pull: { comments: { commentId: req.params.commentId } } }
        )
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        for (let i = 0; i < post.comments.length; i++) {
          if (post.comments[i].commentId === req.params.commentId) {
            if (post.comments[i].userId === userId) {
              Post.updateOne(
                { _id: req.params.id, "comments.userId": userId },

                {
                  $pull: { comments: { commentId: req.params.commentId } }
                }
              )
                .then(() => res.status(200).json({ message: "Post supprimé !" }))
                .then(() => i = post.comments.length)
                .catch((error) => res.status(400).json({ error }));
            }
          }
        }
      }
    })
}

