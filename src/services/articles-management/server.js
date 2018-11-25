require('dotenv').config();
const config = require("./environment/config");
const hostport = `${config.host}:${config.port}`;
