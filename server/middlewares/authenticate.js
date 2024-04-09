const jwt = require("jsonwebtoken");
const Users = require('../models/Users');
require('dotenv').config();

module.exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("req.headers : ", req.headers.authorization.split(" ")[1]);
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log("decodeToken : ", decodeToken);
        const user = await Users.findOne({_id : decodeToken.userId});
        if(!user){
            return res.status(401).send({error : "Authentication Failed!"});
        }
        req.token = token;
        req.user = user;
        req.userId = user._id;
        next();
    } catch (error) {
        res.status(401).send({error : "Authentication Failed!"});
    }
}
module.exports.localVairables = (req, res, next)=>{
    req.app.locals = {
        OTP : null,
        resetSession : false,
    }
    next();
}










