const userRouter = require('./user');
const recipeRouter = require('./recipe');
const categoryRouter = require('./category');

const route = (app) => {
  //route /user
  app.use('/user', userRouter);
  //route /recipe
  app.use('/recipe', recipeRouter);
  //route /category
  app.use('/category', categoryRouter);
};

module.exports = route;
