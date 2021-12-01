const DishController = require('../controllers/DishController');
const express = require('express');
const router = express.Router();

//route dish/get/my
router.get('/get/my', DishController.getMyDish);

//route dish/get/detail
router.get('/get/detail', DishController.getDishDetail);

//route dish/get/all
router.get('/get/all', DishController.getAllDish);

//route dish/create
router.post('/create', DishController.createDish);

module.exports = router;
