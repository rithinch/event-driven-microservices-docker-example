jest.mock('../../src/controllers/event.controller');
jest.mock('../../src/middlewares/jwt');

const request = require('supertest');
const Koa = require('koa');
const eventRoutes = require('../../src/routes/event.routes');
const eventController = require('../../src/controllers/event.controller');

const app = new Koa().use(eventRoutes.routes());

describe('GET /api/events', () => {
  test('Should sucessfully get status 200', async () => {
    const response = await request(app.callback()).get('/api/events');

    expect(response.status).toBe(200);
    expect(response.text).toEqual('');
    expect(eventController.find).toBeCalledTimes(1);
  });
});

describe('GET /api/events/:id', () => {
  test('Should sucessfully get status 200', async () => {
    const response = await request(app.callback()).get('/api/events/123');

    expect(eventController.findById).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('123');
  });
});

describe('POST /api/events', () => {
  test('Should sucessfully get status 200', async (done) => {
    const response = await request(app.callback()).post('/api/events');

    expect(eventController.add).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('');
    done();
  });
});

describe('PUT /api/events/:id', () => {
  test('Should sucessfully get status 200', async (done) => {
    const response = await request(app.callback()).put('/api/events/123');

    expect(eventController.update).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('123');
    done();
  });
});

describe('DELETE /api/events/:id', () => {
  test('Should sucessfully get status 200', async (done) => {
    const response = await request(app.callback()).delete('/api/events/123');

    expect(eventController.delete).toBeCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('123');
    done();
  });
});
