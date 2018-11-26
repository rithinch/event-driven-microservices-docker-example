require('dotenv').config();
const config = require("./environment/config");

const koa = require("koa");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");

mongoose.connect(config.db.uri, {user: config.db.username, pass: config.db.password});
mongoose.connection.on('error', console.error);

const server = new koa();

server.use(logger());
server.use(bodyParser());
server.use(helmet());

server.listen(config.port, config.host, () => {
    console.log(`${config.name} is running at ${config.host}:${config.port}/`)
});

