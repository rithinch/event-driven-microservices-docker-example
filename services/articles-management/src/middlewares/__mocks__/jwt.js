const jwt = jest.fn((ctx, next) => {
  next();
});

module.exports = jwt;
