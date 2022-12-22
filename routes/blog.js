const express = require("express");
const blogRouter = express.Router();
const {getBlogs,addBlogs,updateBlogs,getSingleBlog, deleteBlog,getUserById} = require("../controllers/blogControler")

blogRouter.get("/",getBlogs);
blogRouter.get("/:id",getSingleBlog);
blogRouter.get("/user/:id",getUserById);
blogRouter.post("/add",addBlogs);
blogRouter.delete("/:id",deleteBlog);
blogRouter.put("/update/:id",updateBlogs);

module.exports = blogRouter;