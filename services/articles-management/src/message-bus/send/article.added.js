const logger = require('winston');
const amqp = require('amqp-ts-async');
const config = require('../../environment/config');

const exchangeName = 'articles.added';

module.exports = {
  send: (article) => {
    try {
      if (!article) {
        throw new Error('Sould send a valid article to message queue');
      }
      const connection = new amqp.Connection(config.messagebus);
      const exchange = connection.declareExchange(exchangeName, 'fanout', { durable: false });
      const message = new amqp.Message(JSON.stringify(article));
      exchange.send(message);
      setTimeout(() => {
        connection.close();
      }, config.messageTimeout);
    } catch (err) {
      logger.error(`Error Sending Article Added Event to ${exchangeName}: ${err}`);
    }
  },
};
