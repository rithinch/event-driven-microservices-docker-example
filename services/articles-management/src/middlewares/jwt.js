const koaJwt = require('koa-jwt');
const config = require('../environment/config');

module.exports = koaJwt({
  secret: config.jwtsecret,
});
