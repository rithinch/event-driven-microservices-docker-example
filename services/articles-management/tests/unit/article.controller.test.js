// #region Disabled ESLint Rules...

/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */

// #endregion

// #region Setup Mocks...

jest.mock('../../src/models/article.model');
jest.mock('../../src/message-bus/send/article.added');

// #endregion

// #region Imports...

const articleModel = require('../../src/models/article.model');
const articleController = require('../../src/controllers/article.controller');

// #endregion

// #region Methods...
const sampleArticle = {
  id: 123,
  title: 'Test Article',
};

const createMockContext = (context = {}) => {
  const ctx = context;
  ctx.throw = jest.fn((errorCode) => {});
  return ctx;
};

// #endregion

// #region Unit Tests...

// #region ArticleController_add

describe('add', async () => {
  const createMockOriginalImplementation = articleModel.create;

  beforeEach(() => {
    articleModel.create.mockClear();
  });

  afterEach(() => {
    articleModel.reset();
    articleModel.create = createMockOriginalImplementation;
  });

  test('should add article when valid data is passed', async () => {
    const ctx = createMockContext({ request: { body: sampleArticle } });

    await articleController.add(ctx);

    expect(articleModel.create).toBeCalledTimes(1);
    expect(articleModel.create).toBeCalledWith(sampleArticle);
    expect(ctx.body).toMatchObject(sampleArticle);
    expect(ctx.throw).not.toBeCalled();
    expect(articleModel.count()).toBe(1);
  });

  test('should add article successfully with multiple tags', async () => {
    const newSampleArticle = Object.assign({}, sampleArticle);
    newSampleArticle.tags = ['Sample', 'Article'];

    const ctx = createMockContext({ request: { body: newSampleArticle } });

    await articleController.add(ctx);

    expect(articleModel.create).toBeCalledTimes(1);
    expect(articleModel.create).toBeCalledWith(newSampleArticle);
    expect(ctx.body).toMatchObject(newSampleArticle);
    expect(ctx.throw).not.toBeCalled();
    expect(articleModel.count()).toBe(1);
  });

  test('should add article successfully without images', async () => {
    const ctx = createMockContext({ request: { body: sampleArticle } });

    await articleController.add(ctx);

    expect(articleModel.create).toBeCalledTimes(1);
    expect(articleModel.create).toBeCalledWith(sampleArticle);
    expect(ctx.body).toMatchObject(sampleArticle);
    expect(ctx.throw).not.toBeCalled();
    expect(articleModel.count()).toBe(1);
  });

  test('should add article successfully with images', async () => {
    const newSampleArticle = Object.assign({}, sampleArticle);
    newSampleArticle.images = ['imageLink1', 'imageLink2'];

    const ctx = createMockContext({ request: { body: newSampleArticle } });

    await articleController.add(ctx);

    expect(articleModel.create).toBeCalledTimes(1);
    expect(articleModel.create).toBeCalledWith(newSampleArticle);
    expect(ctx.body).toMatchObject(newSampleArticle);
    expect(ctx.throw).not.toBeCalled();
    expect(articleModel.count()).toBe(1);
  });

  test('should throw an error and not add article when invalid data is passed', async () => {
    articleModel.create = jest.fn((article) => {
      throw new Error();
    });

    const ctx = createMockContext({ request: { body: null } });

    await articleController.add(ctx);

    expect(articleModel.create).toBeCalledTimes(1);
    expect(articleModel.create).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(422);
    expect(articleModel.count()).toBe(0);
  });

  test('should throw an error and not add article when authorUID is missing', async () => {
    articleModel.create = jest.fn((article) => {
      throw new Error();
    });

    const ctx = createMockContext({ request: { body: null } });

    await articleController.add(ctx);

    expect(articleModel.create).toBeCalledTimes(1);
    expect(articleModel.create).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(422);
    expect(articleModel.count()).toBe(0);
  });

  test('should throw an error and not add article when title is missing', async () => {
    // articleModel.create = jest.fn(articleModel.create);
    articleModel.create = jest.fn((article) => {
      throw new Error();
    });

    const ctx = createMockContext({ request: { body: null } });

    await articleController.add(ctx);

    expect(articleModel.create).toBeCalledTimes(1);
    expect(articleModel.create).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(422);
    expect(articleModel.count()).toBe(0);
  });
});

// #endregion

// #region ArticleController_delete
describe('delete', async () => {
  const deleteOriginalMockImplementation = articleModel.findByIdAndRemove;

  beforeEach(() => {
    articleModel.create(sampleArticle);
    articleModel.findByIdAndRemove.mockClear();
  });

  afterEach(() => {
    articleModel.reset();
    articleModel.findByIdAndRemove = deleteOriginalMockImplementation;
  });

  test('should delete article successfully when correct id is passed', async () => {
    const ctx = createMockContext({ params: { id: sampleArticle.id } });
    const beforeCount = articleModel.count();

    await articleController.delete(ctx);

    expect(articleModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(articleModel.findByIdAndRemove).toBeCalledWith(sampleArticle.id);
    expect(ctx.body).toBe(sampleArticle.id);
    expect(ctx.throw).not.toBeCalled();
    expect(articleModel.count()).toBe(beforeCount - 1);
  });

  test('should throw an error when article to delete not found', async () => {
    articleModel.findByIdAndRemove = jest.fn((id) => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: 555 } });

    await articleController.delete(ctx);

    expect(articleModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(articleModel.findByIdAndRemove).toBeCalledWith(555);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw an error when article id passed is null', async () => {
    articleModel.findByIdAndRemove = jest.fn((id) => {
      return null;
    });

    const ctx = createMockContext({ params: { id: 555 } });

    await articleController.delete(ctx);

    expect(articleModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(articleModel.findByIdAndRemove).toBeCalledWith(555);
    expect(ctx.body).toBeNull();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw an error when id passed is of incorrect type', async () => {
    articleModel.findByIdAndRemove = jest.fn((id) => {
      const error = new Error();
      error.name = 'CastError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: 0.9 } });

    await articleController.delete(ctx);

    expect(articleModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(articleModel.findByIdAndRemove).toBeCalledWith(0.9);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw a 500 error and return null for any other errors caught', async () => {
    articleModel.findByIdAndRemove = jest.fn((id) => {
      const error = new Error();
      throw error;
    });

    const ctx = createMockContext({ params: { id: 123 } });

    await articleController.delete(ctx);

    expect(articleModel.findByIdAndRemove).toBeCalledTimes(1);
    expect(articleModel.findByIdAndRemove).toBeCalledWith(123);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(500);
  });
});
// #endregion

// #region ArticleController_find

describe('find', async () => {
  afterEach(() => {
    articleModel.find.mockClear();
    articleModel.reset();
  });

  test('should return empty list when no data present', async () => {
    const ctx = createMockContext();
    await articleController.find(ctx);

    expect(ctx.body).toMatchObject([]);
    expect(articleModel.find).toBeCalledTimes(1);
  });

  test('should return values when data present', async () => {
    articleModel.create(sampleArticle);

    const ctx = createMockContext();
    await articleController.find(ctx);

    expect(articleModel.find).toBeCalledTimes(1);
    expect(ctx.body).toMatchObject([sampleArticle]);
  });
});

// #endregion

// #region ArticleController_findById

describe('findById', async () => {
  const findByIdOrignialMockImplementation = articleModel.findById;

  beforeEach(() => {
    articleModel.create(sampleArticle);
    articleModel.findById.mockClear();
  });

  afterEach(() => {
    articleModel.reset();
    articleModel.findById = findByIdOrignialMockImplementation;
  });

  test('should return article when correct id is passed', async () => {
    const ctx = createMockContext({ params: { id: sampleArticle.id } });

    await articleController.findById(ctx);

    expect(articleModel.findById).toBeCalledTimes(1);
    expect(articleModel.findById).toBeCalledWith(sampleArticle.id);
    expect(ctx.body).toMatchObject(sampleArticle);
    expect(ctx.throw).not.toBeCalled();
  });

  test('should throw an error when id passed doesn\'t exist', async () => {
    const ctx = createMockContext({ params: { id: 555 } });

    await articleController.findById(ctx);

    expect(articleModel.findById).toBeCalledTimes(1);
    expect(articleModel.findById).toBeCalledWith(555);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404, 'Article Not Found');
  });

  test('should throw an error when id passed is null', async () => {
    articleModel.findById = jest.fn((id) => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: null } });

    await articleController.findById(ctx);

    expect(articleModel.findById).toBeCalledTimes(1);
    expect(articleModel.findById).toBeCalledWith(null);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw an error when id passed is of incorrect type', async () => {
    articleModel.findById = jest.fn((id) => {
      const error = new Error();
      error.name = 'CastError';
      throw error;
    });

    const ctx = createMockContext({ params: { id: 0.99 } });

    await articleController.findById(ctx);

    expect(articleModel.findById).toBeCalledTimes(1);
    expect(articleModel.findById).toBeCalledWith(0.99);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
  });

  test('should throw a 500 error and return null for any other errors caught', async () => {
    articleModel.findById = jest.fn((id) => {
      throw new Error();
    });

    const ctx = createMockContext({ params: { id: 123 } });

    await articleController.findById(ctx);

    expect(articleModel.findById).toBeCalledTimes(1);
    expect(articleModel.findById).toBeCalledWith(123);
    expect(ctx.body).toBeUndefined();
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(500);
  });
});

// #endregion

// #region ArticleController_update
describe('update', async () => {
  const updateOriginalMockImplemenation = articleModel.findByIdAndUpdate;

  beforeEach(() => {
    articleModel.findByIdAndUpdate.mockClear();
    articleModel.create(sampleArticle);
  });

  afterEach(() => {
    articleModel.reset();
    articleModel.findByIdAndUpdate = updateOriginalMockImplemenation;
  });

  test('should update article correctly when valid id and data are passed', async () => {
    const newSampleArticle = Object.assign({}, sampleArticle);
    newSampleArticle.title = 'Title Changed!';

    const ctx = createMockContext(
      {
        params: { id: sampleArticle.id },
        request: { body: newSampleArticle },
      },
    );

    await articleController.update(ctx);

    expect(articleModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(articleModel.findByIdAndUpdate).toBeCalledWith(sampleArticle.id, newSampleArticle);
    expect(articleModel.findById(sampleArticle.id).title).toBe(newSampleArticle.title);
    expect(ctx.throw).not.toBeCalled();
    expect(ctx.body).toBe(newSampleArticle);
    expect(articleModel.count()).toBe(1);
  });

  test('should throw an error when article not found', async () => {
    articleModel.findByIdAndUpdate = jest.fn((id) => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    });

    const newSampleArticle = Object.assign({}, sampleArticle);
    newSampleArticle.title = 'Title Changed!';

    const ctx = createMockContext(
      {
        params: { id: 1234 },
        request: { body: newSampleArticle },
      },
    );

    await articleController.update(ctx);

    expect(articleModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(articleModel.findByIdAndUpdate).toBeCalledWith(1234, newSampleArticle);
    expect(articleModel.findById(sampleArticle.id)).toBe(sampleArticle);
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
    expect(ctx.body).toBeUndefined();
    expect(articleModel.count()).toBe(1);
  });

  test('should throw an error when model returns null', async () => {
    articleModel.findByIdAndUpdate = jest.fn((id) => {
      return null;
    });

    const newSampleArticle = Object.assign({}, sampleArticle);
    newSampleArticle.title = 'Title Changed!';

    const ctx = createMockContext(
      {
        params: { id: 123 },
        request: { body: newSampleArticle },
      },
    );

    await articleController.update(ctx);

    expect(articleModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(articleModel.findByIdAndUpdate).toBeCalledWith(123, newSampleArticle);
    expect(articleModel.findById(sampleArticle.id)).toBe(sampleArticle);
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(404);
    expect(ctx.body).toBeNull();
    expect(articleModel.count()).toBe(1);
  });

  test('should throw an error 500 for any other issues found', async () => {
    articleModel.findByIdAndUpdate = jest.fn((id) => {
      const error = new Error();
      throw error;
    });

    const newSampleArticle = Object.assign({}, sampleArticle);
    newSampleArticle.title = 'Title Changed!';

    const ctx = createMockContext(
      {
        params: { id: 1234 },
        request: { body: newSampleArticle },
      },
    );

    await articleController.update(ctx);

    expect(articleModel.findByIdAndUpdate).toBeCalledTimes(1);
    expect(articleModel.findByIdAndUpdate).toBeCalledWith(1234, newSampleArticle);
    expect(articleModel.findById(sampleArticle.id)).toBe(sampleArticle);
    expect(ctx.throw).toBeCalledTimes(1);
    expect(ctx.throw).toBeCalledWith(500);
    expect(ctx.body).toBeUndefined();
    expect(articleModel.count()).toBe(1);
  });
});
// #endregion

// #endregion
