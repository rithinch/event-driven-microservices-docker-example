
// Init the environment variables and server configurations
require('dotenv').config();
const config = require("./environment/config");

// Import the required npm packages
const koa = require("koa");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");

// Get the API routes  file
const articleRouter = require("./routes/article.routes");

// Init Database Connection 
mongoose.connect(config.db.uri, {user: config.db.username, pass: config.db.password});
mongoose.connection.on('error', console.error);

// Init Koa API Server
const server = new koa();
server.use(logger());
server.use(bodyParser());
server.use(helmet());

// Setup the API routes
server.use(articleRouter.routes()).use(articleRouter.allowedMethods({throw: true}));

// Run the API Server
server.listen(config.port, () => {
    console.log(`${config.name} is running on port ${config.port}/`)
});

