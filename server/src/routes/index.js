const userRouter = require('./user');
const dishRouter = require('./dish');

const route = (app) => {
  //route /user
  app.use('/user', userRouter);

  //route /dish
  app.use('/dish', dishRouter);
};

module.exports = route;
