const logger = require('winston');
const emailModule = require('../modules/email/email');

const controller = {};

controller.added = async (message) => {
  try {
    const content = JSON.parse(message.content.toString());
    await emailModule.sendArticleAddedEmail(content);
  } catch (err) {
    logger.error(`Error in handling the recieved message - article.added - ${err}`);
  }
};

module.exports = controller;
