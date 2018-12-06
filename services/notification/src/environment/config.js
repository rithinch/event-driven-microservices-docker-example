const config = {
  name: 'Notification Service',
  messagebus: process.env.MESSAGE_BUS || 'amqp://guest:guest@localhost',
  environment: process.env.ENVIRONMENT || 'dev',
  email: {
    service: process.env.EMAIL_SERVICE || '',
    username: process.env.EMAIL_ID || '',
    password: process.env.EMAIL_PASSWORD || '',
    adminEmailID: process.env.ADMIN_EMAIL || '',
  },
};

config.startedMessage = `${config.name} is running`;

module.exports = config;
