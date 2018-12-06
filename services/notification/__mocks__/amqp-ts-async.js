/* eslint-disable no-unused-vars */
const lib = {};

const bind = jest.fn((exchange) => {

});

const activateConsumer = jest.fn((onRecieve) => {
  onRecieve();
});

const stopConsumer = jest.fn(() => {
});

const declareExchange = jest.fn((exchangeName, type, options) => {

});

const declareQueue = jest.fn((exchangeName, type, options) => ({
  bind,
  activateConsumer,
}));

lib.Connection = jest.fn(url => ({

  connectionUrl: url,
  declareExchange,
  declareQueue,

}));

module.exports = lib;
module.exports.activateConsumer = activateConsumer;
module.exports.bind = bind;
module.exports.stopConsumer = stopConsumer;
