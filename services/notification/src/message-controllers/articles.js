const emailModule = require('../modules/email/email');

const controller = {};

controller.added = async (message) => {
  const content = JSON.parse(message.content.toString());
  await emailModule.sendVerifyArticleEmail(content);
};

module.exports = controller;
