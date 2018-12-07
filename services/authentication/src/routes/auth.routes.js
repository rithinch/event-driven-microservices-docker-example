const KoaRouter = require('koa-router');
const config = require('../environment/config');
const authController = require('../controllers/auth.controller');

const api = 'auth';

const router = new KoaRouter();

router.prefix(`/${config.baseAPIRoute}/${api}`);

// POST /api/auth
router.post('/', authController.authenticate);

module.exports = router;
