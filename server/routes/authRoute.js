const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/authController');
router.post('/register',(req,res)=>{
    registerUser;
});

module.exports = router;