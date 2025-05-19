const Router = require('express');
const router = new Router();

const itemController = require('../controllers/item.controller');

router.get('/', itemController.getFilm);

module.exports = router;