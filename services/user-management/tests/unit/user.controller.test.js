// #region Disabled ESLint Rules...

/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */

// #endregion

// #region Setup Mocks...

jest.mock('../../src/models/user.model');

// #endregion

// #region Imports...

const userModel = require('../../src/models/user.model');
const userController = require('../../src/controllers/user.controller');

// #endregion

// #region Methods...
const sampleUser = {
  id: 123,
  emailAddress: 'test@email.com',
  firstName: 'Test User',
};

const createMockContext = (context = {}) => {
  const ctx = context;
  ctx.throw = jest.fn((errorCode) => {});
  return ctx;
};

// #endregion

// #region Unit Tests...

// #region userController_add

describe('add', async () => {
  const createMockOriginalImplementation = userModel.create;

  beforeEach(() => {
    userModel.create.mockClear();
  });

  afterEach(() => {
    userModel.reset();
    userModel.create = createMockOriginalImplementation;
  });

  test('should add user when valid data is passed', async () => {
    const ctx = createMockContext({ request: { body: sampleUser } });

    await userController.add(ctx);

    expect(userModel.create).toBeCalledTimes(1);
    expect(userModel.create).toBeCalledWith(sampleUser);
    expect(ctx.body).toMatchObject(sampleUser);
    expect(ctx.throw).not.toBeCalled();
    expect(userModel.count()).toBe(1);
  });

  test('should add user successfully with multiple tags', async () => {
    const newsampleUser = Object.assign({}, sampleUser);
    newsampleUser.tags = ['Sample', 'user'];

    const ctx = createMockContext({ request: { body: newsampleUser } });

    await userController.add(ctx);

    expect(userModel.create).toBeCalledTimes(1);
    expect(userModel.create).toBeCalledWith(newsampleUser);
    expect(ctx.body).toMatchObject(newsampleUser);
    expect(ctx.throw).not.toBeCalled();
    expect(userModel.count()).toBe(1);
  });

  test('should add user successfully without images', async () => {
    const ctx = createMockContext({ request: { body: sampleUser } });

    await userController.add(ctx);

    expect(userModel.create).toBeCalledTimes(1);
    expect(userModel.create).toBeCalledWith(sampleUser);
    expect(ctx.body).toMatchObject(sampleUser);
    expect(ctx.throw).not.toBeCalled();
    expect(userModel.count()).toBe(1);
  });

  test('should add user successfully with images', async () => {
    const newsampleUser = Object.assign({}, sampleUser);
    newsampleUser.images = ['imageLink1', 'imageLink2'];

    const ctx = createMockContext({ request: { body: newsampleUser } });

    await userController.add(ctx);

    expect(userModel.create).toBeCalledTimes(1);
    expect(userModel.create).toBeCalledWith(newsampleUser);
    expect(ctx.body).toMatchObject(newsampleUser);
    expect(ctx.throw).not.toBeCalled();
    expect(userModel.count()).toBe(1);
  });

  test('should throw an error and not add user when invalid data is passed', async () => {
    userModel.create = jest.fn((user) => {
      throw new Error();
    });

    const ctx = createMockContext({ request: { body: null } });

    await userController.add(ctx);

    expect(userModel.create).toBeCalledTimes(1);
    expect(userModel.create).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(422);
    expect(userModel.count()).toBe(0);
  });

  test('should throw an error and not add user when email is missing', async () => {
    userModel.create = jest.fn((user) => {
      throw new Error();
    });

    const ctx = createMockContext({ request: { body: null } });

    await userController.add(ctx);

    expect(userModel.create).toBeCalledTimes(1);
    expect(userModel.create).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(422);
    expect(userModel.count()).toBe(0);
  });

  test('should throw an error and not add user when role is missing', async () => {
    userModel.create = jest.fn((user) => {
      throw new Error();
    });

    const ctx = createMockContext({ request: { body: null } });

    await userController.add(ctx);

    expect(userModel.create).toBeCalledTimes(1);
    expect(userModel.create).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(422);
    expect(userModel.count()).toBe(0);
  });
});

// #endregion

// #region userController_delete
describe('delete', async () => {
  const deleteOriginalMockImplementation = userModel.findByIdAndRemove;

  beforeEach(() => {
    userModel.create(sampleUser);
    userModel.findByIdAndRemove.mockClear();
  });

  afterEach(() => {
    userModel.reset();
    userModel.findByIdAndRemove = deleteOriginalMockImplementation;
  });

  test('should delete user successfully when correct id is passed', async () => {
    const ctx = createMockContext({ params: { id: sampleUser.id } });
    const beforeCount = userModel.count();

    await userController.delete(ctx);

    expect(userModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(userModel.findByIdAndRemove).toBeCalledWith(sampleUser.id);
    expect(ctx.body).toBe(sampleUser.id);
    expect(ctx.throw).not.toBeCalled();
    expect(userModel.count()).toBe(beforeCount - 1);
  });

  test('should throw an error when user to delete not found', async () => {
    userModel.findByIdAndRemove = jest.fn((id) => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: 555 } });

    await userController.delete(ctx);

    expect(userModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(userModel.findByIdAndRemove).toBeCalledWith(555);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw an error when user id passed is null', async () => {
    userModel.findByIdAndRemove = jest.fn((id) => {
      return null;
    });

    const ctx = createMockContext({ params: { id: 555 } });

    await userController.delete(ctx);

    expect(userModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(userModel.findByIdAndRemove).toBeCalledWith(555);
    expect(ctx.body).toBeNull();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw an error when id passed is of incorrect type', async () => {
    userModel.findByIdAndRemove = jest.fn((id) => {
      const error = new Error();
      error.name = 'CastError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: 0.9 } });

    await userController.delete(ctx);

    expect(userModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(userModel.findByIdAndRemove).toBeCalledWith(0.9);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw a 500 error and return null for any other errors caught', async () => {
    userModel.findByIdAndRemove = jest.fn((id) => {
      const error = new Error();
      throw error;
    });

    const ctx = createMockContext({ params: { id: 123 } });

    await userController.delete(ctx);

    expect(userModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(userModel.findByIdAndRemove).toBeCalledWith(123);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(500);
  });
});
// #endregion

// #region userController_find

describe('find', async () => {
  afterEach(() => {
    userModel.find.mockClear();
    userModel.reset();
  });

  test('should return empty list when no data present', async () => {
    const ctx = createMockContext();
    await userController.find(ctx);

    expect(ctx.body).toMatchObject([]);
    expect(userModel.find).toBeCalledTimes(1);
  });

  test('should return values when data present', async () => {
    userModel.create(sampleUser);

    const ctx = createMockContext();
    await userController.find(ctx);

    expect(userModel.find).toBeCalledTimes(1);
    expect(ctx.body).toMatchObject([sampleUser]);
  });
});

// #endregion

// #region userController_findById

describe('findById', async () => {
  const findByIdOrignialMockImplementation = userModel.findById;

  beforeEach(() => {
    userModel.create(sampleUser);
    userModel.findById.mockClear();
  });

  afterEach(() => {
    userModel.reset();
    userModel.findById = findByIdOrignialMockImplementation;
  });

  test('should return user when correct id is passed', async () => {
    const ctx = createMockContext({ params: { id: sampleUser.id } });

    await userController.findById(ctx);

    expect(userModel.findById).toBeCalledTimes(1);
    expect(userModel.findById).toBeCalledWith(sampleUser.id);
    expect(ctx.body).toMatchSnapshot();
    expect(ctx.throw).not.toBeCalled();
  });

  test('should throw an error when id passed doesn\'t exist', async () => {
    const ctx = createMockContext({ params: { id: 555 } });

    await userController.findById(ctx);

    expect(userModel.findById).toBeCalledTimes(1);
    expect(userModel.findById).toBeCalledWith(555);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404, 'User Not Found');
  });

  test('should throw an error when id passed is null', async () => {
    userModel.findById = jest.fn((id) => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: null } });

    await userController.findById(ctx);

    expect(userModel.findById).toBeCalledTimes(1);
    expect(userModel.findById).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw an error when id passed is of incorrect type', async () => {
    userModel.findById = jest.fn((id) => {
      const error = new Error();
      error.name = 'CastError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: 0.99 } });

    await userController.findById(ctx);

    expect(userModel.findById).toBeCalledTimes(1);
    expect(userModel.findById).toBeCalledWith(0.99);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw a 500 error and return null for any other errors caught', async () => {
    userModel.findById = jest.fn((id) => {
      throw new Error();
    });

    const ctx = createMockContext({ params: { id: 123 } });

    await userController.findById(ctx);

    expect(userModel.findById).toBeCalledTimes(1);
    expect(userModel.findById).toBeCalledWith(123);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(500);
  });
});

// #endregion

// #region userController_update
describe('update', async () => {
  const updateOriginalMockImplemenation = userModel.findByIdAndUpdate;

  beforeEach(() => {
    userModel.findByIdAndUpdate.mockClear();
    userModel.create(sampleUser);
  });

  afterEach(() => {
    userModel.reset();
    userModel.findByIdAndUpdate = updateOriginalMockImplemenation;
  });

  test('should update user correctly when valid id and data are passed', async () => {
    const newsampleUser = Object.assign({}, sampleUser);
    newsampleUser.firstName = 'firstName Changed!';

    const ctx = createMockContext(
      {
        params: { id: sampleUser.id },
        request: { body: newsampleUser },
      },
    );

    await userController.update(ctx);

    expect(userModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(userModel.findByIdAndUpdate).toBeCalledWith(sampleUser.id, newsampleUser);
    expect(userModel.findById(sampleUser.id).firstName).toBe(newsampleUser.firstName);
    expect(ctx.throw).not.toBeCalled();
    expect(ctx.body).toBe(newsampleUser);
    expect(userModel.count()).toBe(1);
  });

  test('should throw an error when user not found', async () => {
    userModel.findByIdAndUpdate = jest.fn((id) => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    });

    const newsampleUser = Object.assign({}, sampleUser);
    newsampleUser.firstName = 'firstName Changed!';

    const ctx = createMockContext(
      {
        params: { id: 1234 },
        request: { body: newsampleUser },
      },
    );

    await userController.update(ctx);

    expect(userModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(userModel.findByIdAndUpdate).toBeCalledWith(1234, newsampleUser);
    expect(userModel.findById(sampleUser.id)).toBe(sampleUser);
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
    expect(ctx.body).toBeUndefined();
    expect(userModel.count()).toBe(1);
  });

  test('should throw an error when model returns null', async () => {
    userModel.findByIdAndUpdate = jest.fn((id) => {
      return null;
    });

    const newsampleUser = Object.assign({}, sampleUser);
    newsampleUser.firstName = 'firstName Changed!';

    const ctx = createMockContext(
      {
        params: { id: 123 },
        request: { body: newsampleUser },
      },
    );

    await userController.update(ctx);

    expect(userModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(userModel.findByIdAndUpdate).toBeCalledWith(123, newsampleUser);
    expect(userModel.findById(sampleUser.id)).toBe(sampleUser);
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
    expect(ctx.body).toBeNull();
    expect(userModel.count()).toBe(1);
  });

  test('should throw an error 500 for any other issues found', async () => {
    userModel.findByIdAndUpdate = jest.fn((id) => {
      const error = new Error();
      throw error;
    });

    const newsampleUser = Object.assign({}, sampleUser);
    newsampleUser.firstName = 'firstName Changed!';

    const ctx = createMockContext(
      {
        params: { id: 1234 },
        request: { body: newsampleUser },
      },
    );

    await userController.update(ctx);

    expect(userModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(userModel.findByIdAndUpdate).toBeCalledWith(1234, newsampleUser);
    expect(userModel.findById(sampleUser.id)).toBe(sampleUser);
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(500);
    expect(ctx.body).toBeUndefined();
    expect(userModel.count()).toBe(1);
  });
});
// #endregion

// #endregion
