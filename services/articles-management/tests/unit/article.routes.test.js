jest.mock('../../src/controllers/article.controller');
jest.mock('../../src/middlewares/jwt');

const request = require('supertest');
const Koa = require('koa');
const articleRoutes = require('../../src/routes/article.routes');
const articleController = require('../../src/controllers/article.controller');

const app = new Koa().use(articleRoutes.routes());

describe('GET /api/articles', () => {
  test('Should sucessfully get status 200', async () => {
    const response = await request(app.callback()).get('/api/articles');

    expect(response.status).toBe(200);
    expect(response.text).toEqual('');
    expect(articleController.find).toBeCalledTimes(1);
  });
});

describe('GET /api/articles/:id', () => {
  test('Should sucessfully get status 200', async () => {
    const response = await request(app.callback()).get('/api/articles/123');

    expect(articleController.findById).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('123');
  });
});

describe('POST /api/articles', () => {
  test('Should sucessfully get status 200', async (done) => {
    const response = await request(app.callback()).post('/api/articles');

    expect(articleController.add).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('');
    done();
  });
});

describe('PUT /api/articles/:id', () => {
  test('Should sucessfully get status 200', async (done) => {
    const response = await request(app.callback()).put('/api/articles/123');

    expect(articleController.update).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('123');
    done();
  });
});

describe('DELETE /api/articles/:id', () => {
  test('Should sucessfully get status 200', async (done) => {
    const response = await request(app.callback()).delete('/api/articles/123');

    expect(articleController.delete).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('123');
    done();
  });
});
