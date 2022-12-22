const  mongoose  = require("mongoose");
const BlogModel = require("../model/blog");
const UserModel = require("../model/user");


const getBlogs= async(req,res,next)=>{
    let blogs;
    try{
      blogs =  await BlogModel.find().populate("user")
    }
    catch(err){
        console.log(err)
    }
    if(!blogs){
        return res.status(400).json({message:"Blog Not Found"})
    }
    return res.status(200).json({blogs})
}

const addBlogs= async(req,res,next)=>{
    let {title,description,image,user} = req.body;

    let existingUser ;
    try {
        existingUser = await UserModel.findById(user)
    } catch (error) {
        console.log(error)
    }

    if(!existingUser){
        return res.status(400).json({message:"Unable to find the user by Id"})
    }


    const blog = new BlogModel({
        title,description,image,user
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})

}

const updateBlogs= async(req,res,next)=>{
    const id = req.params.id;
    let {title,description} = req.body;
    let blog;
    try {
         blog = await BlogModel.findByIdAndUpdate(id,{title,description});
        
    } catch (error) {
        console.log(error)
    }
    if(!blog) {
        return res.status(500).json({messgae:"Blog not update"})
    }
    return res.status(200).json({blog})
}


const getSingleBlog=async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await BlogModel.findById(id)
         
    } catch (error) {
        console.log(error)
    }
    if(!blog){
        return res.status(404).json({message:"Blog not found!!!"})
    }
    return res.status(200).json({blog});
}

const deleteBlog =async(req,res,next)=>{
    const id = req.params.id;
    // console.log(id)
    let blog;
    try{
       blog = await BlogModel.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog)
        await blog.user.save();
    }
    catch(error){
        console.log(error)
    }
    // console.log(blog)
    if(!blog){
       return res.status(500).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"Successfully Deleted"})
}

const getUserById= async(req,res,next)=>{
    const id = req.params.id;
    let userBlog;
    try {
        userBlog = await UserModel.findById(id).populate("blogs")
    } catch (error) {
        console.log(error)
    }
    if(!userBlog){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({user:userBlog})
}


module.exports ={ getBlogs , addBlogs , updateBlogs , getSingleBlog , deleteBlog, getUserById }