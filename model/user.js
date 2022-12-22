const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const BlogModel = require("./blog");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:BlogModel,
        required:true
    }]
})



//===========for securing the password=========//

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
        next();
    })
    
    


const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;