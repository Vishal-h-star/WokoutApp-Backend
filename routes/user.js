const express = require('express');

// User controller
const { loginUser, signupUser } = require('../Controllers/userController');

const router = express.Router();

// login user
router.post('/login' ,  loginUser);

// singup user
router.post('/signup' , signupUser);
 


module.exports = router ;