const prisma = require('../models/prisma');
const slugify = require('slugify');
const { customRandom, urlAlphabet, random } = require('nanoid');
const nanoid = customRandom(urlAlphabet, 10, random);

// console.log(nanoid());

class RecipeController {
  createRecipe = async (req, res, next) => {
    try {
      // const createRecipe = await prisma.recipe.create({
      //   data: {
      //     // authorId: req.body.authorId,
      //     authorId: 'QZzXsTWfuAVDIahVMISbTY6fcwv1',
      //     name: req.body.name,
      //     content: req.body.content,
      //     description: req.body.description,
      //     coverImage: String(req.body.coverImage),
      //     prepTime: req.body.prepTime,
      //     cookTime: req.body.cookTime,
      //     servings: req.body.servings,
      //     recipeSlug: `${slugify(req.body.name)}-${nanoid()}`,
      //     categoryId: 1,

      //     ingredients: 1,
      //   },
      //   include: {
      //     user: true,
      //   },
      // });
      const response = await prisma.recipe.create({
        data: {
          authorId: req.body.authorId,
          content: req.body.content,
          description: req.body.description,
          cookTime: req.body.cookTime,
          //categoryId: req.body.categoryId,
          name: req.body.name,
          prepTime: req.body.prepTime,
          servings: req.body.servings,
          recipeSlug: `${slugify(req.body.name)}-${nanoid()}`,
          //coverImage: String(req.body.coverImage),

          categories: {
            connect: {
              id: req.body.categoryId,
            },
          },
        },
      });
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new RecipeController();
