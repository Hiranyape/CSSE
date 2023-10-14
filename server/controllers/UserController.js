const User = require('../models/UserModel')
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
        res.status(200).json({email,token});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

const signupUser = async(req,res) =>{
    const{
        email,
        username,
        password,
        role
    }=req.body
    try{
    const user = await User.signup(email,username,password,role);
    const token = createtoken(user._id);
    res.status(200).json({email,token});
    }catch(error){
        res.status(400).json({error:error.message});
    } 
}

module.exports = {signupUser,loginUser}