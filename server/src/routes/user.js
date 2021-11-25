const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../firebase/middleware/auth-middleware');
const userInfoMiddleware = require('../firebase/middleware/getInfo-middleware');

router.patch('/update/profile/avatar', UserController.updateAvatar);

//router get user/get/profile
router.get('/get/profile', UserController.getUserProfile);

//router post user/update
router.post('/update/profile', UserController.updateUserProfile);

//router post user/create
router.post('/create', UserController.createUserProfile);

//router get user/get
router.get('/get', authMiddleware, userInfoMiddleware);

module.exports = router;
