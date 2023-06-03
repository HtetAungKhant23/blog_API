const express = require('express');
const router = express.Router();
const controller = require('../../controllers/user/userCtrl');
const { isAuth } = require('../../middlewares/isAuth');
const multer = require('multer');
const storage = require('../../configs/cloudinary');

const upload = multer({ storage });


router.post('/signup', controller.signup);

router.post('/signin', controller.signin);  

router.get('/profile', isAuth, controller.profile);

router.post('/profile-photo', isAuth, upload.single('profile'), controller.profilePhoto);

router.get('/profile-viewers/:id', isAuth, controller.whoViewsMyProfile);

router.post('/following/:id', isAuth, controller.following);

router.post('/unfollowing/:id', isAuth, controller.unFollowing);

module.exports = router;