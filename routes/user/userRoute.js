const express = require('express');
const router = express.Router();
const controller = require('../../controllers/user/userCtrl');
const { isAuth } = require('../../middlewares/isAuth');
const multer = require('multer');
const storage = require('../../configs/cloudinary');
const isAdmin = require('../../middlewares/isAdmin');

const upload = multer({ storage });

router.post('/signup', controller.signup);

router.post('/signin', controller.signin);  

router.get('/profile', isAuth, controller.profile);

router.post('/profile-photo', isAuth, upload.single('profile'), controller.profilePhoto);

router.get('/profile-viewers/:id', isAuth, controller.whoViewsMyProfile);

router.post('/following/:id', isAuth, controller.following);

router.post('/unfollowing/:id', isAuth, controller.unFollowing);

router.post('/block/:id', isAuth, controller.blockUser);

router.post('/unblock/:id', isAuth, controller.unblockUser);

router.put('/admin-block/:id', isAuth, isAdmin, controller.adminBlock);

router.put('/admin-unblock/:id', isAuth, isAdmin, controller.adminUnblock);

module.exports = router;