/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */

const Koa = require('koa');
const userRouter = require('../../src/routes/user.routes');

const mockUserRoutes = jest.fn(() => { return async (ctx, next) => {}; });
userRouter.routes = mockUserRoutes;

describe('Koa App', () => {
  test('Should return valid koa application', () => {
    const app = require('../../src/app');
    expect(app).toBeInstanceOf(Koa);
  });

  test('Should have user routes', () => {
    require('../../src/app');
    expect(mockUserRoutes.mock.calls.length).toBe(1);
  });
});
