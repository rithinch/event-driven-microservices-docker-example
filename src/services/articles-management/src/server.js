/* eslint-disable no-console */

// Init the environment variables and server configurations
require('dotenv').config();

// Import the required npm packages
const Koa = require('koa');
const Logger = require('koa-logger');
const Helmet = require('koa-helmet');
const BodyParser = require('koa-bodyparser');
const Mongoose = require('mongoose');
const config = require('./environment/config');

// Get the API routes  file
const articleRouter = require('./routes/article.routes');

// Init Database Connection
Mongoose.connect(config.db.uri, { user: config.db.username, pass: config.db.password });
Mongoose.connection.on('error', console.error);

// Init Koa API Server
const server = new Koa();
server.use(Logger());
server.use(BodyParser());
server.use(Helmet());

// Setup the API routes
server.use(articleRouter.routes()).use(articleRouter.allowedMethods({ throw: true }));

// Run the API Server
server.listen(config.port, () => {
  console.log(`${config.name} is running on port ${config.port}/`);
});
