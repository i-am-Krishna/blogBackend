const UserModel = require("../model/user")
const bcrypt = require("bcryptjs");
const getUsers = async(req,res,next)=>{
    let userData;
    try{
        userData = await UserModel.find();

    }catch(err){
        console.log(err)
    }
    if(!userData){
        return res.status(404).json({message:"User Not Found"})
    }
    return res.status(200).json({userData})
}


const signup = async(req,res,next)=>{
    let {name,email,password} = req.body;
    let existingUser;
    try{
        existingUser = await UserModel.findOne({email});

    }catch(err){
        console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exists"})
    }
    const newUser = new UserModel({
        name,email,password,blogs:[]
    });
    try{await newUser.save() }
    catch(err){console.log(err)}
   return res.status(201).json({newUser})
}


const login= async(req,res,next)=>{
    let {email,password} = req.body;
    let existingUser;
    try{
        existingUser = await UserModel.findOne({email});

    }catch(err){
        console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message:"User Not Exists!!!"})
    }

    const correctPassword = await bcrypt.compare(password,existingUser.password)
    if(!correctPassword){ 
       return res.status(400).json({message:"Incorrect Password"})
}
       return res.status(200).json({message:"Login Successful",user:existingUser})
}





module.exports = {getUsers,signup,login}