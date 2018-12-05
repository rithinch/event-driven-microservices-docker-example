/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */

const Koa = require('koa');
const eventRouter = require('../../src/routes/event.routes');

const mockEventRoutes = jest.fn(() => { return async (ctx, next) => {}; });
eventRouter.routes = mockEventRoutes;

describe('Koa App', () => {
  test('Should return valid koa application', () => {
    const app = require('../../src/app');
    expect(app).toBeInstanceOf(Koa);
  });

  test('Should have article routes', () => {
    require('../../src/app');
    expect(mockEventRoutes.mock.calls.length).toBe(1);
  });
});
