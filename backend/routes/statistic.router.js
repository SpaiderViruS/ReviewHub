const Router = require('express');
const router = new Router();

const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const statisticContoller = require('../controllers/statistic.controller')

router.get('/counts', authMiddleware, adminMiddleware, statisticContoller.getCounts);
router.get('/top-rated', authMiddleware, adminMiddleware, statisticContoller.getTopRated);
router.get('/by-year', authMiddleware, adminMiddleware, statisticContoller.getItemsByYear);

module.exports = router;