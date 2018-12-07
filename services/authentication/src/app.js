// Import the required npm packages
const Koa = require('koa');
const Logger = require('koa-logger');
const Helmet = require('koa-helmet');
const BodyParser = require('koa-bodyparser');

// Get the API routes  file
const authRouter = require('./routes/auth.routes');

// Init Koa API App
const app = new Koa();
app.use(Logger());
app.use(BodyParser());
app.use(Helmet());

// Setup the API routes
app.use(authRouter.routes()).use(authRouter.allowedMethods({ throw: true }));

module.exports = app;
