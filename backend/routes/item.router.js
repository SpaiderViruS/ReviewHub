const Router = require('express');
const router = new Router();

const itemController = require('../controllers/item.controller');

const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/popular', itemController.getPopularsItems);
router.get('/favorites', authMiddleware, itemController.getFavoritesItems);
router.post('/favorites/:id', authMiddleware, itemController.addToFavorites);

router.get('/', itemController.getItems);
router.get('/:id', itemController.getCurrentItem);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, itemController.createItem);
router.put('/:id', authMiddleware, adminMiddleware, itemController.editItem);

module.exports = router;