const eventController = {};

eventController.find = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = '';
});

eventController.findById = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.params.id;
});

eventController.add = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = '';
});

eventController.update = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.params.id;
});

eventController.delete = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.params.id;
});

module.exports = eventController;
