const prisma = require('../models/prisma');
const slugify = require('slugify');
const { customRandom, urlAlphabet, random } = require('nanoid');
const nanoid = customRandom(urlAlphabet, 10, random);

// console.log(nanoid());

class DishController {
  createDish = async (req, res, next) => {
    try {
      const response = await prisma.dish.create({
        data: {
          authorId: req.body.authorId,
          name: req.body.name,
          description: req.body.description,
          dishSlug: `${slugify(req.body.name)}-${nanoid()}`,

          ingredients: {
            create: req.body.ingredients,
          },

          recipes: {
            create: {
              difficulty: req.body.difficulty,
              prepTime: parseFloat(req.body.prepTime),
              cookTime: parseFloat(req.body.cookTime),
            },
          },
        },
        include: {
          ingredients: true,
          recipes: true,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  getAllDish = async (req, res, next) => {
    try {
      const response = await prisma.dish.findMany({
        include: {
          user: true,
          recipes: true,
          ingredients: true,
        },
      });
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  getDishDetail = async (req, res, next) => {
    try {
      const response = await prisma.dish.findUnique({
        where: {
          dishSlug: String(req.query.dishSlug),
        },
        include: {
          user: true,
          recipes: true,
          ingredients: true,
        },
      });

      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  getMyDish = async (req, res, next) => {
    try {
      const response = await prisma.dish.findMany({
        where: {
          authorId: req.query.authorId,
        },
        include: {
          user: true,
          recipes: true,
          ingredients: true,
        },
      });
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new DishController();
