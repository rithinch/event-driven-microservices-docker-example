articleController = require("../controllers/article.controller");

let implementation = {

    addArticle: async (ctx) => {
        ctx.res = await articleController.addArticle();
    },

    addImage: async (ctx) => {
        ctx.res = await articleController.addImage();
    },

    deleteArticle: async (ctx) => {
        ctx.res = await articleController.deleteByArticleUID();
    },

    getArticle: async (ctx) => {
        ctx.res = await articleController.getByArticleUID();
    },

    getAll: async (ctx) => {
        ctx.res = await articleController.getAll();
    },

    getAllPendingVerificationArticles: async (ctx) => {
        ctx.res = await articleController.getAllPendingVerificationArticles();
    },

    rejectArticle: async (ctx) => {
        ctx.res = await articleController.rejectArticle();
    },

    verifyArticle: async (ctx) => {
        ctx.res = await articleController.verifyArticle();
    }
}

module.exports = implementation;