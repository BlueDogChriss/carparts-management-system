const router = require('express').Router();
const UserController = require('../controllers/users');
const AuthController = require('../controllers/auth');

router.get('/', UserController.getUsers);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login)

module.exports = router;