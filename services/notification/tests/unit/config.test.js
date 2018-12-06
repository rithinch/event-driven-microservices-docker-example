const config = require('../../src/environment/config');

describe('config', () => {
  test('should load default values', () => {
    expect(config.name).not.toBeNull();
    expect(config.environment).not.toBeNull();
    expect(config.messagebus).not.toBeNull();
    expect(config.email.service).not.toBeNull();
    expect(config.email.username).not.toBeNull();
    expect(config.email.password).not.toBeNull();
    expect(config.email.adminEmailID).not.toBeNull();
    expect(config).toMatchSnapshot();
  });
});
