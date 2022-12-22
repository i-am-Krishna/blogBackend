const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://krishna:f2JLlecuZvEsws0P@blogapplication.v30uomz.mongodb.net/Blogapp?retryWrites=true&w=majority",{
     useNewUrlParser: true,
     useUnifiedTopology: true,
})

module.exports = connection;