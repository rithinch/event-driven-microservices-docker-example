const KoaRouter = require('koa-router');
const config = require('../environment/config');
const articleController = require('../controllers/article.controller');

const api = 'articles';

const router = new KoaRouter();

router.prefix(`/${config.baseAPIRoute}/${api}`);

// GET /api/articles
router.get('/', articleController.find);

// POST /api/articles
router.post('/', articleController.add);

// GET /api/articles/id
router.get('/:id', articleController.findById);

// PUT /api/articles/id
router.put('/:id', articleController.update);

// DELETE /api/articles/id
router.delete('/:id', articleController.delete);

module.exports = router;
