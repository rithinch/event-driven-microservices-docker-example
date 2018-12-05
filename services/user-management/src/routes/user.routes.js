const KoaRouter = require('koa-router');
const config = require('../environment/config');
const usersController = require('../controllers/user.controller');

const api = 'users';

const router = new KoaRouter();

router.prefix(`/${config.baseAPIRoute}/${api}`);

// GET /api/users
router.get('/', usersController.find);

// POST /api/users
router.post('/', usersController.add);

// GET /api/users/id
router.get('/:id', usersController.findById);

// PUT /api/users/id
router.put('/:id', usersController.update);

// DELETE /api/users/id
router.delete('/:id', usersController.delete);

module.exports = router;
