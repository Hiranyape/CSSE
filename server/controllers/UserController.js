const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createtoken = (_id)=>{
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn: '3d'});

}
const loginUser = async(req,res) =>{
    const {email,password} = req.body
    try{
        const user = await User.login(email,password);
        const token = createtoken(user._id);
        const role = user.role;
        res.status(200).json({email,token,role});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

const signupUser = async (req, res) => {
  const { email, username, password, role } = req.body;
  try {
    const user = await User.signup(email, username, password, role);
    const token = createToken(user._id);
    res.status(200).json({ email, token ,role});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get all users with a specific role
const getUsersByRole = async (req, res) => {
  const { role } = req.params; // Assuming you pass the role as a route parameter
  try {
    const users = await User.find({ role: role });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete one supplier by ID
const deleteSupplierById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSupplier = await User.findByIdAndDelete(id);

    if (!deletedSupplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the supplier" });
  }
};

// Function to delete all suppliers
const deleteAllSuppliers = async (req, res) => {
  try {
    await User.deleteMany({ role: 'supplier' }); 
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all suppliers" });
  }
};

module.exports = { signupUser, loginUser, getUsersByRole, deleteSupplierById, deleteAllSuppliers };
