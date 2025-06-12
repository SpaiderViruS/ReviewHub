const Router = require('express');
const router = new Router();

const authMiddleware = require('../middleware/auth.middleware');

const reviewsController = require('../controllers/reviews.controller');

router.get('/profile', authMiddleware, reviewsController.getUserReview);

router.get('/:id', reviewsController.getItemReviews);
router.post('/', authMiddleware, reviewsController.createItemReview);

module.exports = router;