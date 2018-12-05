// #region Disabled ESLint Rules...

/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */

// #endregion

// #region Setup Mocks...

jest.mock('../../src/models/event.model');

// #endregion

// #region Imports...

const eventModel = require('../../src/models/event.model');
const eventController = require('../../src/controllers/event.controller');

// #endregion

// #region Methods...
const sampleEvent = {
  id: 123,
  title: 'Test Event',
};

const createMockContext = (context = {}) => {
  const ctx = context;
  ctx.throw = jest.fn((errorCode) => {});
  return ctx;
};

// #endregion

// #region Unit Tests...

// #region EventController_add

describe('add', async () => {
  const createMockOriginalImplementation = eventModel.create;

  beforeEach(() => {
    eventModel.create.mockClear();
  });

  afterEach(() => {
    eventModel.reset();
    eventModel.create = createMockOriginalImplementation;
  });

  test('should add event when valid data is passed', async () => {
    const ctx = createMockContext({ request: { body: sampleEvent } });

    await eventController.add(ctx);

    expect(eventModel.create).toBeCalledTimes(1);
    expect(eventModel.create).toBeCalledWith(sampleEvent);
    expect(ctx.body).toMatchObject(sampleEvent);
    expect(ctx.throw).not.toBeCalled();
    expect(eventModel.count()).toBe(1);
  });

  test('should add event successfully with multiple tags', async () => {
    const newsampleEvent = Object.assign({}, sampleEvent);
    newsampleEvent.tags = ['Sample', 'event'];

    const ctx = createMockContext({ request: { body: newsampleEvent } });

    await eventController.add(ctx);

    expect(eventModel.create).toBeCalledTimes(1);
    expect(eventModel.create).toBeCalledWith(newsampleEvent);
    expect(ctx.body).toMatchObject(newsampleEvent);
    expect(ctx.throw).not.toBeCalled();
    expect(eventModel.count()).toBe(1);
  });

  test('should add event successfully without images', async () => {
    const ctx = createMockContext({ request: { body: sampleEvent } });

    await eventController.add(ctx);

    expect(eventModel.create).toBeCalledTimes(1);
    expect(eventModel.create).toBeCalledWith(sampleEvent);
    expect(ctx.body).toMatchObject(sampleEvent);
    expect(ctx.throw).not.toBeCalled();
    expect(eventModel.count()).toBe(1);
  });

  test('should add event successfully with images', async () => {
    const newsampleEvent = Object.assign({}, sampleEvent);
    newsampleEvent.images = ['imageLink1', 'imageLink2'];

    const ctx = createMockContext({ request: { body: newsampleEvent } });

    await eventController.add(ctx);

    expect(eventModel.create).toBeCalledTimes(1);
    expect(eventModel.create).toBeCalledWith(newsampleEvent);
    expect(ctx.body).toMatchObject(newsampleEvent);
    expect(ctx.throw).not.toBeCalled();
    expect(eventModel.count()).toBe(1);
  });

  test('should throw an error and not add event when invalid data is passed', async () => {
    eventModel.create = jest.fn((event) => {
      throw new Error();
    });

    const ctx = createMockContext({ request: { body: null } });

    await eventController.add(ctx);

    expect(eventModel.create).toBeCalledTimes(1);
    expect(eventModel.create).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(422);
    expect(eventModel.count()).toBe(0);
  });

  test('should throw an error and not add event when authorUID is missing', async () => {
    eventModel.create = jest.fn((event) => {
      throw new Error();
    });

    const ctx = createMockContext({ request: { body: null } });

    await eventController.add(ctx);

    expect(eventModel.create).toBeCalledTimes(1);
    expect(eventModel.create).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(422);
    expect(eventModel.count()).toBe(0);
  });

  test('should throw an error and not add event when title is missing', async () => {
    // eventModel.create = jest.fn(eventModel.create);
    eventModel.create = jest.fn((event) => {
      throw new Error();
    });

    const ctx = createMockContext({ request: { body: null } });

    await eventController.add(ctx);

    expect(eventModel.create).toBeCalledTimes(1);
    expect(eventModel.create).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(422);
    expect(eventModel.count()).toBe(0);
  });
});

// #endregion

// #region EventController_delete
describe('delete', async () => {
  const deleteOriginalMockImplementation = eventModel.findByIdAndRemove;

  beforeEach(() => {
    eventModel.create(sampleEvent);
    eventModel.findByIdAndRemove.mockClear();
  });

  afterEach(() => {
    eventModel.reset();
    eventModel.findByIdAndRemove = deleteOriginalMockImplementation;
  });

  test('should delete event successfully when correct id is passed', async () => {
    const ctx = createMockContext({ params: { id: sampleEvent.id } });
    const beforeCount = eventModel.count();

    await eventController.delete(ctx);

    expect(eventModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(eventModel.findByIdAndRemove).toBeCalledWith(sampleEvent.id);
    expect(ctx.body).toBe(sampleEvent.id);
    expect(ctx.throw).not.toBeCalled();
    expect(eventModel.count()).toBe(beforeCount - 1);
  });

  test('should throw an error when event to delete not found', async () => {
    eventModel.findByIdAndRemove = jest.fn((id) => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: 555 } });

    await eventController.delete(ctx);

    expect(eventModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(eventModel.findByIdAndRemove).toBeCalledWith(555);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw an error when event id passed is null', async () => {
    eventModel.findByIdAndRemove = jest.fn((id) => {
      return null;
    });

    const ctx = createMockContext({ params: { id: 555 } });

    await eventController.delete(ctx);

    expect(eventModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(eventModel.findByIdAndRemove).toBeCalledWith(555);
    expect(ctx.body).toBeNull();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw an error when id passed is of incorrect type', async () => {
    eventModel.findByIdAndRemove = jest.fn((id) => {
      const error = new Error();
      error.name = 'CastError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: 0.9 } });

    await eventController.delete(ctx);

    expect(eventModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(eventModel.findByIdAndRemove).toBeCalledWith(0.9);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw a 500 error and return null for any other errors caught', async () => {
    eventModel.findByIdAndRemove = jest.fn((id) => {
      const error = new Error();
      throw error;
    });

    const ctx = createMockContext({ params: { id: 123 } });

    await eventController.delete(ctx);

    expect(eventModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(eventModel.findByIdAndRemove).toBeCalledWith(123);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(500);
  });
});
// #endregion

// #region EventController_find

describe('find', async () => {
  afterEach(() => {
    eventModel.find.mockClear();
    eventModel.reset();
  });

  test('should return empty list when no data present', async () => {
    const ctx = createMockContext();
    await eventController.find(ctx);

    expect(ctx.body).toMatchObject([]);
    expect(eventModel.find).toBeCalledTimes(1);
  });

  test('should return values when data present', async () => {
    eventModel.create(sampleEvent);

    const ctx = createMockContext();
    await eventController.find(ctx);

    expect(eventModel.find).toBeCalledTimes(1);
    expect(ctx.body).toMatchObject([sampleEvent]);
  });
});

// #endregion

// #region EventController_findById

describe('findById', async () => {
  const findByIdOrignialMockImplementation = eventModel.findById;

  beforeEach(() => {
    eventModel.create(sampleEvent);
    eventModel.findById.mockClear();
  });

  afterEach(() => {
    eventModel.reset();
    eventModel.findById = findByIdOrignialMockImplementation;
  });

  test('should return event when correct id is passed', async () => {
    const ctx = createMockContext({ params: { id: sampleEvent.id } });

    await eventController.findById(ctx);

    expect(eventModel.findById).toBeCalledTimes(1);
    expect(eventModel.findById).toBeCalledWith(sampleEvent.id);
    expect(ctx.body).toMatchObject(sampleEvent);
    expect(ctx.throw).not.toBeCalled();
  });

  test('should throw an error when id passed doesn\'t exist', async () => {
    const ctx = createMockContext({ params: { id: 555 } });

    await eventController.findById(ctx);

    expect(eventModel.findById).toBeCalledTimes(1);
    expect(eventModel.findById).toBeCalledWith(555);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404, 'Event Not Found');
  });

  test('should throw an error when id passed is null', async () => {
    eventModel.findById = jest.fn((id) => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: null } });

    await eventController.findById(ctx);

    expect(eventModel.findById).toBeCalledTimes(1);
    expect(eventModel.findById).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw an error when id passed is of incorrect type', async () => {
    eventModel.findById = jest.fn((id) => {
      const error = new Error();
      error.name = 'CastError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: 0.99 } });

    await eventController.findById(ctx);

    expect(eventModel.findById).toBeCalledTimes(1);
    expect(eventModel.findById).toBeCalledWith(0.99);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw a 500 error and return null for any other errors caught', async () => {
    eventModel.findById = jest.fn((id) => {
      throw new Error();
    });

    const ctx = createMockContext({ params: { id: 123 } });

    await eventController.findById(ctx);

    expect(eventModel.findById).toBeCalledTimes(1);
    expect(eventModel.findById).toBeCalledWith(123);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(500);
  });
});

// #endregion

// #region eventController_update
describe('update', async () => {
  const updateOriginalMockImplemenation = eventModel.findByIdAndUpdate;

  beforeEach(() => {
    eventModel.findByIdAndUpdate.mockClear();
    eventModel.create(sampleEvent);
  });

  afterEach(() => {
    eventModel.reset();
    eventModel.findByIdAndUpdate = updateOriginalMockImplemenation;
  });

  test('should update event correctly when valid id and data are passed', async () => {
    const newsampleEvent = Object.assign({}, sampleEvent);
    newsampleEvent.title = 'Title Changed!';

    const ctx = createMockContext(
      {
        params: { id: sampleEvent.id },
        request: { body: newsampleEvent },
      },
    );

    await eventController.update(ctx);

    expect(eventModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(eventModel.findByIdAndUpdate).toBeCalledWith(sampleEvent.id, newsampleEvent);
    expect(eventModel.findById(sampleEvent.id).title).toBe(newsampleEvent.title);
    expect(ctx.throw).not.toBeCalled();
    expect(ctx.body).toBe(newsampleEvent);
    expect(eventModel.count()).toBe(1);
  });

  test('should throw an error when event not found', async () => {
    eventModel.findByIdAndUpdate = jest.fn((id) => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    });

    const newsampleEvent = Object.assign({}, sampleEvent);
    newsampleEvent.title = 'Title Changed!';

    const ctx = createMockContext(
      {
        params: { id: 1234 },
        request: { body: newsampleEvent },
      },
    );

    await eventController.update(ctx);

    expect(eventModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(eventModel.findByIdAndUpdate).toBeCalledWith(1234, newsampleEvent);
    expect(eventModel.findById(sampleEvent.id)).toBe(sampleEvent);
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
    expect(ctx.body).toBeUndefined();
    expect(eventModel.count()).toBe(1);
  });

  test('should throw an error when model returns null', async () => {
    eventModel.findByIdAndUpdate = jest.fn((id) => {
      return null;
    });

    const newsampleEvent = Object.assign({}, sampleEvent);
    newsampleEvent.title = 'Title Changed!';

    const ctx = createMockContext(
      {
        params: { id: 123 },
        request: { body: newsampleEvent },
      },
    );

    await eventController.update(ctx);

    expect(eventModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(eventModel.findByIdAndUpdate).toBeCalledWith(123, newsampleEvent);
    expect(eventModel.findById(sampleEvent.id)).toBe(sampleEvent);
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
    expect(ctx.body).toBeNull();
    expect(eventModel.count()).toBe(1);
  });

  test('should throw an error 500 for any other issues found', async () => {
    eventModel.findByIdAndUpdate = jest.fn((id) => {
      const error = new Error();
      throw error;
    });

    const newsampleEvent = Object.assign({}, sampleEvent);
    newsampleEvent.title = 'Title Changed!';

    const ctx = createMockContext(
      {
        params: { id: 1234 },
        request: { body: newsampleEvent },
      },
    );

    await eventController.update(ctx);

    expect(eventModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(eventModel.findByIdAndUpdate).toBeCalledWith(1234, newsampleEvent);
    expect(eventModel.findById(sampleEvent.id)).toBe(sampleEvent);
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(500);
    expect(ctx.body).toBeUndefined();
    expect(eventModel.count()).toBe(1);
  });
});
// #endregion

// #endregion
