const logger = require('winston');
const amqp = require('amqp-ts-async');
const config = require('../../environment/config');
const authController = require('../../controllers/auth.controller');

const exchangeName = 'user.added';
const queueName = '';

const connection = new amqp.Connection(config.messagebus);
const exchange = connection.declareExchange(exchangeName, 'fanout', { durable: false });
const queue = connection.declareQueue(queueName, { exclusive: true });
queue.bind(exchange);

module.exports = {
  start: () => {
    try {
      queue.activateConsumer(authController.add);
    } catch (err) {
      logger.error(`Error Listening to ${exchangeName}, ${queueName}: ${err}`);
    }
  },
};
