const config = {
  name: 'Authentication Service',
  baseAPIRoute: 'api',
  port: process.env.PORT || 8080,
  messagebus: process.env.MESSAGE_BUS || 'amqp://rabbitmq',
  environment: process.env.ENVIRONMENT || 'dev',
  db: {
    uri: process.env.DB_URI || 'mongodb://chalumuv-localnewsapplication.documents.azure.com:10255/?ssl=true&replicaSet=globaldb',
    username: process.env.DB_USERNAME || 'chalumuv-localnewsapplication',
    password: process.env.DB_PASSWORD || 'TlJ7hnd7iRck25fUFFWYgfJFdK2oSH1N2kbBQjFzb66nqFx486JP6eaCKAQrlyn3Cnwxn6MzJtF5ABeyN9CKYQ==',
  },
  jwtsecret: 'yoursecretkey',
};

config.startedMessage = `${config.name} is running on port ${config.port}/`;

module.exports = config;
