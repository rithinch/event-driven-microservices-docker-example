const config = require('../../src/environment/config');

describe('config', () => {
  test('should load default values', () => {
    expect(config.name).not.toBeNull();
    expect(config.port).not.toBeNull();
    expect(config.baseAPIRoute).not.toBeNull();
    expect(config.environment).not.toBeNull();
    expect(config.messagebus).not.toBeNull();
    expect(config.db.uri).not.toBeNull();
    expect(config.db.username).not.toBeNull();
    expect(config.db.password).not.toBeNull();
  });
});
