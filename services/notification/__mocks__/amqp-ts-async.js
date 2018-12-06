/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */


const bind = jest.fn((exchange) => {
});

const activateConsumer = jest.fn((onRecieve) => {
  onRecieve();
});

const declareExchange = jest.fn((exchangeName, type, options) => {
  return exchangeName;
});

const declareQueue = jest.fn((exchangeName, type, options) => {
  return {
    bind,
    activateConsumer,
  };
});

const connection = jest.fn((url) => {
  return {
    connectionUrl: url,
    declareExchange,
    declareQueue,
  };
});

module.exports.Connection = connection;
module.exports.activateConsumer = activateConsumer;
module.exports.bind = bind;
module.exports.declareExchange = declareExchange;
module.exports.declareQueue = declareQueue;
