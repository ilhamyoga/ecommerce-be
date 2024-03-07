'use strict';

const response = require('../utils/response');

// MIDDLEWARES
const bearer = require('../middlewares/bearer');
const cors = require('../middlewares/cors');

// ROUTES
const adminRouter = require('./admin');
const userRouter = require('./user');

const guard = [cors.whitelist, bearer]

// ROUTINGS
module.exports = (app) => {
  // ADMIN
  app.use('/admin/auth', guard, adminRouter.authRouter);
  app.use('/admin/products', guard, adminRouter.productsRouter);

  // USER
  app.use('/auth', guard, userRouter.authRouter);
  app.use('/products', guard, userRouter.productsRouter);
  app.use('/orders', guard, userRouter.ordersRouter);

  // catch 404 and forward to error handler
  app.use(cors.allowAll, (_, res) => {
    res.status(404).json(response({ error: 'No such route exists' }))
  })
}
