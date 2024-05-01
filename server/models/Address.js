const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "Users",
      },
    houseno : {
        type : String,
        required : true,
    },
    street : {
        type : String,
        required : true,
    },
    town : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    province : {
        type : String,
        required : true,
    },
})
module.exports = mongoose.models.address || mongoose.model("address", addressSchema);





















