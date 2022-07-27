const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const postCtrl = require('../controllers/post')
const auth = require('../middleware/auth')

router.post('/post',auth,multer, postCtrl.postpost);
router.get('/post',auth, postCtrl.getAllpost);
router.put('/post/:id',auth, multer, postCtrl.modifypost);
router.post('/post/like/:id',auth, postCtrl.likePost);
router.delete('/post/:id',auth, postCtrl.deletePost);
module.exports = router;