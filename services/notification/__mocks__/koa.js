const appListen = jest.fn(() => {

});

module.exports = jest.fn(() => ({
  listen: appListen,
}));

module.exports.appListen = appListen;
