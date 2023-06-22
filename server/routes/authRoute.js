const express = require('express');
const router = express.Router();
const {registerUser, loginUser, userData, updateUser, verifyMail} = require('../controllers/authController');
const authMiddleware = require('../config/authMiddleware');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/userdata', authMiddleware, userData);
router.post('/update',updateUser);
router.post('/verify-mail', verifyMail)
module.exports = router;