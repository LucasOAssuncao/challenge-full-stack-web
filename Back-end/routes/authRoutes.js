const express = require('express');
const authController = require('../controllers/authController');
const validateRegister = require('../middleware/validateRegister');

const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);

module.exports = router;
