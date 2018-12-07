jest.mock('../../src/controllers/user.controller');
jest.mock('../../src/middlewares/jwt');

const request = require('supertest');
const Koa = require('koa');
const userRoutes = require('../../src/routes/user.routes');
const userController = require('../../src/controllers/user.controller');

const app = new Koa().use(userRoutes.routes());

describe('GET /api/users', () => {
  test('Should sucessfully get status 200', async () => {
    const response = await request(app.callback()).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.text).toEqual('');
    expect(userController.find).toBeCalledTimes(1);
  });
});

describe('GET /api/users/:id', () => {
  test('Should sucessfully get status 200', async () => {
    const response = await request(app.callback()).get('/api/users/123');

    expect(userController.findById).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('123');
  });
});

describe('POST /api/users', () => {
  test('Should sucessfully get status 200', async (done) => {
    const response = await request(app.callback()).post('/api/users');

    expect(userController.add).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('');
    done();
  });
});

describe('PUT /api/users/:id', () => {
  test('Should sucessfully get status 200', async (done) => {
    const response = await request(app.callback()).put('/api/users/123');

    expect(userController.update).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('123');
    done();
  });
});

describe('DELETE /api/users/:id', () => {
  test('Should sucessfully get status 200', async (done) => {
    const response = await request(app.callback()).delete('/api/users/123');

    expect(userController.delete).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('123');
    done();
  });
});
