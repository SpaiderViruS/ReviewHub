const Router = require('express');
const router = new Router();

const userController = require('../controllers/users.controller');

router.post('/login', userController.login);
router.post('/registration', userController.regisration);

module.exports = router;