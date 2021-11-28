const prisma = require('../models/prisma');

class CategoryController {
  getCategory = async (req, res, next) => {
    try {
      const getCategoryInDb = await prisma.category.findMany();
      res.status(200).json(getCategoryInDb);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new CategoryController();
