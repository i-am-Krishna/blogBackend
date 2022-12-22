const express = require("express");
const connection = require("./db/db");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT  || 8000;
app.use("/api/user",userRouter)
app.use("/api/blog",blogRouter)
app.get("/",(req,res)=>{
    res.send("Hello World")
})


app.listen(PORT,async()=>{
    try{
        await connection;
        console.log("Backend connect with database")
    }
    catch{
        console.log("Something went wrong in database")
    }
    console.log(`Port run on ${PORT}`)
})
 