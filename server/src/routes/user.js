const express = require('express');
const router = express.Router();
const authMiddleware = require('../firebase/middleware/auth-middleware');
const userInfoMiddleware = require('../firebase/middleware/getInfo-middleware');

//route user/getUser
router.get('/getUser', authMiddleware, userInfoMiddleware);

module.exports = router;
