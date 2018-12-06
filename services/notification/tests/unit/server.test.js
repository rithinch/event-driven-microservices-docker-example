/* eslint-disable global-require */
jest.mock('../../src/subscriptions/article.added');
jest.mock('koa');
jest.mock('winston');

const koa = require('koa');
const winston = require('winston');
const articleAddedSubscription = require('../../src/subscriptions/article.added');
const config = require('../../src/environment/config');

test('Server works', async () => {
  require('../../src/server');
  expect(koa.appListen).toBeCalledTimes(1);
  expect(winston.info).toBeCalledTimes(1);
  expect(winston.info).toBeCalledWith(config.startedMessage);
  expect(articleAddedSubscription.start).toBeCalledTimes(1);
});
