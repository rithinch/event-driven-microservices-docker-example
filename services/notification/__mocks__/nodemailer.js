/* eslint-disable no-unused-vars */

const lib = {};

const sendMail = jest.fn(options => true);

lib.createTransport = jest.fn(options => ({
  sendMail,
}));

module.exports = lib;
module.exports.sendMail = sendMail;
