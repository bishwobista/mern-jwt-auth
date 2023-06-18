const express = require('express');
const router = express.Router();
const {registerUser, loginUser, userData} = require('../controllers/authController');
const authMiddleware = require('../config/authMiddleware');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/userdata', authMiddleware, userData);
// router.post('/userdata', (req, res) => res.send({success: true, message: "Authorized"}));
module.exports = router;