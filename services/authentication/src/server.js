/* eslint-disable no-console */

// Init the environment variables and server configurations
require('dotenv').config();

// Import the required packages
const Mongoose = require('mongoose');
const config = require('./environment/config');
const app = require('./app');

// Init Database Connection
Mongoose.connect(config.db.uri, { user: config.db.username, pass: config.db.password });
Mongoose.connection.on('error', console.error);

// Start Listening to Subscribed Events
require('./message-bus/recieve/user.added').start();

// Run the API Server
app.listen(config.port, () => {
  console.log(config.startedMessage);
});
