const mongoose = require('mongoose');
require('dotenv').config();

module.exports = connect = async()=>{
    try {
        const response =  await mongoose.connect(process.env.DATABASE_CONNECTION);
        if(response){
            console.log("Database is connected successfully...!");
        }
    } catch (error) {
        console.log(error);
    }
}




