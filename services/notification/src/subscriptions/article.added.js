const logger = require('winston');
const amqp = require('amqp-ts-async');
const config = require('../environment/config');
const articleMessageController = require('../message-controllers/articles');

const exchangeName = 'articles.added';
const queueName = '';

const connection = new amqp.Connection(config.messagebus);
const exchange = connection.declareExchange(exchangeName, 'fanout', { durable: false });
const queue = connection.declareQueue(queueName, { exclusive: true });
queue.bind(exchange);

module.exports = {
  start: () => {
    try {
      queue.activateConsumer(articleMessageController.added);
    } catch (err) {
      logger.error(`Error Listening to ${exchangeName}, ${queueName}: ${err}`);
    }
  },
};
