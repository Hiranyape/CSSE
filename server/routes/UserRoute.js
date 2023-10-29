const express = require("express");
const router = express.Router();
//controller 
const {signupUser,loginUser, getUsersByRole, deleteSupplierById, deleteAllSuppliers} = require('../controllers/UserController')

router.post('/login',loginUser);
router.post('/signUp',signupUser);
router.get('/users/:role', getUsersByRole);
router.delete("/:id", deleteSupplierById);
router.delete("/all", deleteAllSuppliers);

module.exports = router;
