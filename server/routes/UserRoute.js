const express = require("express");
const router = express.Router();
//controller 
const {signupUser,loginUser, getUsersByRole} = require('../controllers/UserController')
//login 
router.post('/login',loginUser);
router.post('/signUp',signupUser);
router.get('/users/:role', getUsersByRole);

module.exports = router;
//signup