/* eslint-disable global-require */
const mongoose = require('mongoose');

const mockSchema = jest.fn();
const mockModel = jest.fn((modelName, schema) => ({ modelName, schema }));

mongoose.model = mockModel;
mongoose.Schema = mockSchema;

describe('Article Model', () => {
  test('Should have the correct article name', () => {
    const model = require('../../src/models/article.model');
    expect(model.modelName).toBe('Article');
  });

  test('Schema should contain the required fields', () => {
    require('../../src/models/article.model');
    expect(mockSchema).toBeCalledTimes(1);
    const schema = mockSchema.mock.calls[0][0];
    expect(Object.keys(schema).length).toBe(10);
    expect(schema.authorUID).toBeDefined();
    expect(schema.createdDate).toBeDefined();
    expect(schema.updatedDate).toBeDefined();
    expect(schema.title).toBeDefined();
    expect(schema.description).toBeDefined();
    expect(schema.body).toBeDefined();
    expect(schema.meta).toBeDefined();
    expect(schema.status).toBeDefined();
    expect(schema.imagesUID).toBeDefined();
    expect(schema.tags).toBeDefined();
  });
});
