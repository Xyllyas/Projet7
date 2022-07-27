const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

require('dotenv').config()

exports.signUp = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                lastName: req.body.lastName,
                role: 'basic'
            });
            user.save()
                .then(() =>
                    res.send({
                        name: user.name,
                        lastName: user.lastName,
                        userId: user._id,
                        role: user.role,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    }))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Adresse mail invalide !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    const token = jwt.sign(
                        { userId: user._id, role: user.role },
                        process.env.SECRET_TOKEN,
                        { expiresIn: '24h' }
                    )
                    res.send({
                        name: user.name,
                        lastName: user.lastName,
                        userId: user._id,
                        role: user.role,
                        token: token
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};



