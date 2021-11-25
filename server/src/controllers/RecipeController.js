const prisma = require('../models/prisma');

class RecipeController {
  createRecipe = async (req, res, next) => {
    try {
      const createRecipe = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          coverImage: String(req.body.coverImage),
          prepTime: req.body.prepTime,
          cookTime: req.body.cookTime,
          servings: req.body.servings,

          ingredient: {
            create: {
              description: req.body.description,
            },
          },
        },
      });
      res.status(201).json(createRecipe);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new RecipeController();
