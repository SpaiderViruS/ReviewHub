const Router = require('express');
const router = new Router();

const authMiddleware = require('../middleware/auth.middleware');
const statisticContoller = require('../controllers/statistic.controller')

router.get('/counts', authMiddleware, statisticContoller.getCounts);
router.get('/top-rated', authMiddleware, statisticContoller.getTopRated);
router.get('/by-year', authMiddleware, statisticContoller.getItemsByYear);

module.exports = router;