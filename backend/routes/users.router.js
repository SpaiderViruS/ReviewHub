const Router = require('express');
const router = new Router();

const userController = require('../controllers/users.controller');

const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.post('/login', userController.login);
router.post('/registration', userController.regisration);

// Admin routes
// TODO: сделать проверку на роль админа в токене, возможно сделать новый мидлвеер админский
router.get('/all', authMiddleware, adminMiddleware, userController.getAllUsers);
router.put('/:id', authMiddleware, adminMiddleware, userController.editUser);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;