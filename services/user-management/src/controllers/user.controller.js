const Users = require('../models/user.model');
const userAddedMessage = require('../message-bus/send/user.added');

const userController = {
  find: async (ctx) => {
    ctx.body = await Users.find();
  },

  findById: async (ctx) => {
    try {
      const result = await Users.findById(ctx.params.id);
      if (!result) {
        ctx.throw(404, 'User Not Found');
      }
      ctx.body = result;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      } else {
        ctx.throw(500);
      }
    }
  },

  add: async (ctx) => {
    try {
      const newUser = await Users.create(ctx.request.body);
      userAddedMessage.send(ctx.request.body);
      ctx.body = newUser;
    } catch (err) {
      ctx.throw(422);
    }
  },

  update: async (ctx) => {
    try {
      const result = await Users.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body,
      );
      if (!result) {
        ctx.throw(404);
      }
      ctx.body = result;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      } else {
        ctx.throw(500);
      }
    }
  },

  delete: async (ctx) => {
    try {
      const result = await Users.findByIdAndRemove(ctx.params.id);
      if (!result) {
        ctx.throw(404);
      }
      ctx.body = result;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      } else {
        ctx.throw(500);
      }
    }
  },
};

module.exports = userController;
