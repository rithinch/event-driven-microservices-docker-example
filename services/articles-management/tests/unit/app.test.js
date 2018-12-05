/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */

const Koa = require('koa');
const articleRouter = require('../../src/routes/article.routes');

const mockArticleRoutes = jest.fn(() => { return async (ctx, next) => {}; });
articleRouter.routes = mockArticleRoutes;

describe('Koa App', () => {
  test('Should return valid koa application', () => {
    const app = require('../../src/app');
    expect(app).toBeInstanceOf(Koa);
  });

  test('Should have article routes', () => {
    require('../../src/app');
    expect(mockArticleRoutes.mock.calls.length).toBe(1);
  });
});
