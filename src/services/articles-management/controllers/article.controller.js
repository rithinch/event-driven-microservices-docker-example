const Article = require('../models/article.model');

const articleController = {
  find: async (ctx) => {
    ctx.body = await Article.find();
  },

  findById: async (ctx) => {
    try {
      const result = await Article.findById(ctx.params.id);
      if (!result) {
        ctx.throw(404, 'Article Not Found');
      }
      ctx.body = result;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  },

  add: async (ctx) => {
    try {
      const newArticle = await new Article(ctx.request.body).save();
      ctx.body = newArticle;
    } catch (err) {
      ctx.throw(422);
    }
  },

  update: async (ctx) => {
    try {
      const result = await Article.findByIdAndUpdate(
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
      }
      ctx.throw(500);
    }
  },

  delete: async (ctx) => {
    try {
      const result = await Article.findByIdAndRemove(ctx.params.id);
      if (!result) {
        ctx.throw(404);
      }
      ctx.body = result;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  },
};

module.exports = articleController;
