const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please provide the username"],
    },
    email : {
        type : String, 
        required : [true, "Please provide the email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Please provide the password"],
    },
    profile :{
        type : String,
    },
   
})
module.exports =  mongoose.models.Users || mongoose.model("Users", userSchema);




