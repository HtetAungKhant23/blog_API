const express = require('express');
const router = express.Router();
const controller = require('../../controllers/user/userCtrl');

router.post('/signup', controller.signup);

router.post('/signin', controller.signin);

router.get('/profile/:id', controller.profile);

module.exports = router;