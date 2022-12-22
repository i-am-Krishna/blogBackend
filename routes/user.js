const express = require("express");
const {getUsers,signup,login} = require("../controllers/userControler")
const userRouter = express.Router();


userRouter.get("/",getUsers)
userRouter.post("/signup",signup)
userRouter.post("/login",login)


module.exports = userRouter;