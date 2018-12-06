require('dotenv').config();
const logger = require('winston');
const Koa = require('koa');
const config = require('./environment/config');

require('./subscriptions/article.added').start();

const app = new Koa();
app.listen();
logger.info(config.startedMessage);
