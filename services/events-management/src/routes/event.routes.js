const KoaRouter = require('koa-router');
const config = require('../environment/config');
const eventsController = require('../controllers/event.controller');

const api = 'events';

const router = new KoaRouter();

router.prefix(`/${config.baseAPIRoute}/${api}`);

// GET /api/events
router.get('/', eventsController.find);

// POST /api/events
router.post('/', eventsController.add);

// GET /api/events/id
router.get('/:id', eventsController.findById);

// PUT /api/events/id
router.put('/:id', eventsController.update);

// DELETE /api/events/id
router.delete('/:id', eventsController.delete);

module.exports = router;
