/* eslint-disable global-require */
const mongoose = require('mongoose');

const mockSchema = jest.fn();
const mockModel = jest.fn((modelName, schema) => ({ modelName, schema }));

mongoose.model = mockModel;
mongoose.Schema = mockSchema;

describe('User Model', () => {
  test('Should have the correct user model name', () => {
    const model = require('../../src/models/user.model');
    expect(model.modelName).toBe('User');
  });

  test('Schema should contain the required fields', () => {
    require('../../src/models/user.model');
    expect(mockSchema).toBeCalledTimes(1);
    const schema = mockSchema.mock.calls[0][0];
    expect(Object.keys(schema).length).toBe(10);
    expect(schema.createdDate).toBeDefined();
    expect(schema.updatedDate).toBeDefined();
    expect(schema.firstName).toBeDefined();
    expect(schema.description).toBeDefined();
    expect(schema.lastName).toBeDefined();
    expect(schema.meta).toBeDefined();
    expect(schema.emailAddress).toBeDefined();
    expect(schema.imagesUID).toBeDefined();
    expect(schema.tags).toBeDefined();
    expect(schema.role).toBeDefined();
  });
});
