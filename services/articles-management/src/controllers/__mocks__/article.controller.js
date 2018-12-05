const articleController = {};

articleController.find = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = '';
});

articleController.findById = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.params.id;
});

articleController.add = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = '';
});

articleController.update = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.params.id;
});

articleController.delete = jest.fn(async (ctx) => {
  ctx.status = 200;
  ctx.body = ctx.params.id;
});

module.exports = articleController;
