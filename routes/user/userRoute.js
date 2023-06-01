const express = require('express');
const router = express.Router();
const controller = require('../../controllers/user/userCtrl');
const { isAuth } = require('../../middlewares/isAuth');

router.post('/signup', controller.signup);

router.post('/signin', controller.signin);

router.get('/profile', isAuth, controller.profile);

module.exports = router;