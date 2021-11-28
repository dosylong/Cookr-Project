const prisma = require('../models/prisma');
const slugify = require('slugify');
const { customRandom, urlAlphabet, random } = require('nanoid');
const nanoid = customRandom(urlAlphabet, 10, random);

// console.log(nanoid());

class RecipeController {
  createRecipe = async (req, res, next) => {
    try {
      console.log(req.body);
      const createRecipe = await prisma.recipe.create({
        data: {
          authorId: req.body.authorId,
          name: req.body.name,
          content: req.body.content,
          description: req.body.description,
          coverImage: String(req.body.coverImage),
          prepTime: req.body.prepTime,
          cookTime: req.body.cookTime,
          servings: req.body.servings,
          recipeSlug: `${slugify(req.body.name)}-${nanoid()}`,
          categoryId: req.body.categoryId,

          ingredients: {
            create: {
              description: Array(req.body.description),
            },
          },
        },
      });
      res.status(201).json(createRecipe);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new RecipeController();
