/* eslint-disable global-require */

const mongoose = require('mongoose');
const app = require('../../src/app');
const config = require('../../src/environment/config');

const consoleObj = console;
const consoleLogMock = jest.fn();

const mockConnectDB = jest.fn();
const mockListen = jest.fn((port, startedMessage) => {
  startedMessage();
});

mongoose.connect = mockConnectDB;
app.listen = mockListen;
consoleObj.log = consoleLogMock;

afterEach(() => {
  mockListen.mockReset();
  mockConnectDB.mockReset();
  consoleLogMock.mockReset();
});

test('Server works', async () => {
  require('../../src/server');

  expect(mockConnectDB.mock.calls.length).toBe(1);
  expect(mockConnectDB.mock.calls[0][0]).toBe(config.db.uri);
  expect(mockConnectDB.mock.calls[0][1].user).toBe(config.db.username);
  expect(mockConnectDB.mock.calls[0][1].pass).toBe(config.db.password);

  expect(mockListen.mock.calls.length).toBe(1);
  expect(mockListen.mock.calls[0][0]).toBe(config.port);
  expect(mockListen.mock.calls[0][1]).not.toBeNull();

  expect(consoleLogMock.mock.calls.length).toBe(1);
  expect(consoleLogMock.mock.calls[0][0]).toBe(config.startedMessage);
});
