const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.signupPage);
router.post('/signup', authController.signUp);
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout_get);

module.exports = router;