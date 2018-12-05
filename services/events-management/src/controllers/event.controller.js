const Events = require('../models/event.model');

const eventController = {
  find: async (ctx) => {
    ctx.body = await Events.find();
  },

  findById: async (ctx) => {
    try {
      const result = await Events.findById(ctx.params.id);
      if (!result) {
        ctx.throw(404, 'Event Not Found');
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
      const newEvent = await Events.create(ctx.request.body);
      ctx.body = newEvent;
    } catch (err) {
      ctx.throw(422);
    }
  },

  update: async (ctx) => {
    try {
      const result = await Events.findByIdAndUpdate(
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
      const result = await Events.findByIdAndRemove(ctx.params.id);
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

module.exports = eventController;
