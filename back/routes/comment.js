const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment')
const auth = require('../middleware/auth')

router.post('/comment/:id',auth, commentCtrl.postComment);
router.put('/comment/:id/modify/:commentId',auth, commentCtrl.modifyComment);
router.delete('/comment/:id/:commentId',auth, commentCtrl.deleteComment);

module.exports = router;