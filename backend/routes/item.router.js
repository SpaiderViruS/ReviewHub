const Router = require('express');
const router = new Router();

const itemController = require('../controllers/item.controller');

const authMiddleware = require('../middleware/auth.middleware')

router.get('/', itemController.getItems);
router.get('/popular', itemController.getPopularsItems)
router.get('/:id', itemController.getCurrentItem);

// Admin routes
router.post('/', authMiddleware, itemController.createItem);
router.put('/:id', authMiddleware, itemController.editItem);

module.exports = router;