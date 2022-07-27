const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const password = require('../middleware/password')
router.post('/signup',password, userCtrl.signUp);
router.post('/login', userCtrl.login);

module.exports = router;    