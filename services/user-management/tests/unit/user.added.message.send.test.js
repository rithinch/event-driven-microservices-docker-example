/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
jest.mock('winston');
jest.mock('amqp-ts-async');
jest.useFakeTimers();

const winston = require('winston');
const amqp = require('amqp-ts-async');
const config = require('../../src/environment/config');

const message = {
  title: 'Test Article',
  description: 'Test Text',
};

describe('Message Broker Connection', () => {
  afterEach(() => {
    amqp.close.mockClear();
    amqp.declareExchange.mockClear();
    jest.mock('amqp-ts-async');
  });

  test('Should connect to correct url', () => {
    require('../../src/message-bus/send/user.added').send(message);
    expect(amqp.Connection).toBeCalledTimes(1);
    expect(amqp.Connection).toBeCalledWith(config.messagebus);
    expect(winston.error).not.toBeCalled();
  });

  test('Should init with correct exchange details', () => {
    require('../../src/message-bus/send/user.added').send(message);
    expect(amqp.declareExchange.mock.calls.length).toBe(1);
    expect(amqp.declareExchange.mock.calls[0][0]).toBe('user.added');
    expect(amqp.declareExchange.mock.calls[0][1]).toBe('fanout');
    expect(winston.error).not.toBeCalled();
  });

  test('Should close connection after timeout', () => {
    jest.runAllTimers();
    require('../../src/message-bus/send/user.added').send(message);
    expect(amqp.close.mock.calls.length).toBeGreaterThan(0);
    expect(winston.error).not.toBeCalled();
  });
});

describe('Send', () => {
  afterEach(() => {
    amqp.send.mockClear();
    jest.mock('amqp-ts-async');
  });

  test('Should send succesfully when valid user is passed', () => {
    require('../../src/message-bus/send/user.added').send(message);
    expect(amqp.send).toHaveBeenCalled();
    expect(winston.error).not.toBeCalled();
  });

  test('Should correcly parse the json object', () => {
    require('../../src/message-bus/send/user.added').send(message);
    expect(amqp.send).toBeCalledTimes(1);
    expect(amqp.Message).toBeCalledWith(JSON.stringify(message));
    expect(amqp.send.mock.calls[0][0]).toMatchSnapshot();
    expect(winston.error).not.toBeCalled();
  });

  test('Should log exception if there null user is passed', () => {
    require('../../src/message-bus/send/user.added').send(null);
    expect(amqp.send).not.toBeCalled();
    expect(winston.error).toBeCalled();
  });
});
