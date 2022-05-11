const config = {
    name: 'Frontend',
    baseAPIRoute: 'api',
    port: process.env.PORT || 8080,
    messagebus: process.env.MESSAGE_BUS || 'amqp://rabbitmq',
    environment: process.env.ENVIRONMENT || 'dev',
    db: {
      uri: process.env.DB_URI || 'mongodb+srv://cluster0.jna5m.mongodb.net/eventdrivendb?retryWrites=true&w=majority',
      username: process.env.DB_USERNAME || 'bunnyshell',
      password: process.env.DB_PASSWORD || 'bunnyshell',
    },
    services: {
    },
    jwtsecret: 'bunnyshell',
  };
  
  config.startedMessage = `${config.name} is running on port ${config.port}/`;
  
  module.exports = config;
  