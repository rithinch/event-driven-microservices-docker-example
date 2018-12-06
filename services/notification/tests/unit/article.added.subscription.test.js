/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
jest.mock('winston');
jest.mock('amqp-ts-async');
jest.mock('../../src/message-controllers/articles');

const winston = require('winston');
const amqp = require('amqp-ts-async');
const config = require('../../src/environment/config');
const articleMessageController = require('../../src/message-controllers/articles');

describe('Message Broker Connection', () => {
  afterEach(() => {
    jest.mock('amqp-ts-async');
  });

  test('Should connect to correct url', () => {
    require('../../src/subscriptions/article.added');
    expect(amqp.Connection).toBeCalledTimes(1);
    expect(amqp.Connection).toBeCalledWith(config.messagebus);
  });

  test('Should init with correct exchange details', () => {
    require('../../src/subscriptions/article.added');
    expect(amqp.declareExchange.mock.calls.length).toBe(1);
    expect(amqp.declareExchange.mock.calls[0][0]).toBe('articles.added');
    expect(amqp.declareExchange.mock.calls[0][1]).toBe('fanout');
  });

  test('Should init correct queue', () => {
    require('../../src/subscriptions/article.added');
    expect(amqp.declareQueue.mock.calls.length).toBe(1);
    expect(amqp.declareQueue.mock.calls[0][0]).toBe('');
  });
  test('Should bind the queue to exchange', () => {
    require('../../src/subscriptions/article.added');
    expect(amqp.bind.mock.calls.length).toBe(1);
    expect(amqp.bind.mock.calls[0][0]).toBe('articles.added');
  });
});

describe('Listening', () => {
  afterEach(() => {
    jest.mock('amqp-ts-async');
    amqp.activateConsumer.mockClear();
    articleMessageController.added.mockClear();
  });

  test('Should start listening', () => {
    require('../../src/subscriptions/article.added').start();
    expect(amqp.activateConsumer.mock.calls.length).toBe(1);
    expect(articleMessageController.added).toBeCalledTimes(1);
    expect(winston.error).not.toBeCalled();
  });

  test('Should log exception if there is an error when starting listening', () => {
    articleMessageController.added = jest.fn((msg) => {
      throw new Error();
    });
    require('../../src/subscriptions/article.added').start();
    expect(amqp.activateConsumer.mock.calls.length).toBe(1);
    expect(articleMessageController.added).toBeCalledTimes(1);
    expect(winston.error).toBeCalled();
  });
});
