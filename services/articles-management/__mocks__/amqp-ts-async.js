/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */


const bind = jest.fn((exchange) => {
});

const activateConsumer = jest.fn((onRecieve) => {
  onRecieve();
});

const send = jest.fn(msg => msg);

const declareExchange = jest.fn((exchangeName, type, options) => {
  return {
    send,
  };
});

const declareQueue = jest.fn((exchangeName, type, options) => {
  return {
    bind,
    activateConsumer,
  };
});

const close = jest.fn();

const connection = jest.fn((url) => {
  return {
    connectionUrl: url,
    declareExchange,
    declareQueue,
    close,
  };
});

const message = jest.fn(msg => msg);

module.exports.Connection = connection;
module.exports.activateConsumer = activateConsumer;
module.exports.bind = bind;
module.exports.declareExchange = declareExchange;
module.exports.declareQueue = declareQueue;
module.exports.Message = message;
module.exports.send = send;
module.exports.close = close;
