const CategoryController = require('../controllers/CategoryController');
const express = require('express');
const router = express.Router();

//router post post/create
router.get('/get', CategoryController.getCategory);

module.exports = router;
