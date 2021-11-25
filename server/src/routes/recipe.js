const RecipeController = require('../controllers/RecipeController');
const express = require('express');
const router = express.Router();

//router post post/create
router.post('/create', RecipeController.createRecipe);

module.exports = router;
