const userController = {};

userController.find = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = '';
});

userController.findById = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.params.id;
});

userController.add = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = '';
});

userController.update = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.params.id;
});

userController.delete = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.params.id;
});

module.exports = userController;
