const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const otpGenerator = require("otp-generator");
// const sendToken = require("../utils/jwtTokens");
// verify user
module.exports.verifyUser = async (req, res, next) => {
  try {
    //   const { email } = req.method == "GET" ? req.query : req.body;
    const { email } = req.body;
    console.log("email : ", email);
    // Check the user existence
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};
// Function to generate JWT token
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
/*
POST : http://localhost:4000/register
"name" : "waleed",
    "email" : "waleed2333@gmail.com",
    "password" : "a41241",
    "profile" : ""
*/
module.exports.userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await Users.findOne({ email });
    let url = `http://localhost:4000/uploads/${req.file.filename}`;
    console.log("req.file",url );
    // If the user already exists, return an error
      if (userEmail) {
        return res.status(400).json({ error: "User email already exists" });
      }
    const user = {
      name: name,
      email: email,
      password: password,
      profile: `http://localhost:4000/uploads/${req.file.filename}` || "",
    };
    // Generate an activation token
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    try {
      // Send activation email to the user
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, Please click on the link to activate your account : ${activationUrl}`,
      });

     return res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// create Activation for user login

module.exports.activation = async (req, res) => {
  try {
    const { activation_token } = req.params;
    console.log("activation : ", activation_token);
    const newUser = jwt.verify(activation_token, process.env.SECRET_KEY);
    if (!newUser) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const { name, email, password, profile } = newUser;
    // Check if the user already exists in the database
    let user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    // If user does not exist, create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await Users.create({
      name,
      email,
      profile,
      password: hashedPassword,
    });
    // Send token to the client
    const requiredToken = createActivationToken({ email }); // Create token with only necessary info
    return res.status(200).json({
      // Fixed status code
      success: true,
      user,
      requiredToken,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*
POST : http://localhost:4000/login
 "email" : "waleed2333@gmail.com",
    "password" : "a41241"
*/
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields...!" });
  }
  try {
    // Check if the user exists
    const userExist = await Users.findOne({ email });
    console.log("userExist : ", userExist); // Log userExist for debugging
    if (!userExist) {
      return res.status(401).json({ message: "User not found...!" });
    }
    // Check if the password is correct
    console.log("Stored Password: ", userExist.password); // Log stored password for debugging
    console.log("Entered Password: ", password); // Log entered password for debugging
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials...!" });
    }
    // Create JWT token
    const token = jwt.sign({ userId: userExist._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "User Login Successful...!",
      username: userExist.name,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error); // Log any login errors for debugging
    return res.status(500).json({ error: "Internal server error...!" });
  }
};

/*
GET : http://localhost:4000/getUser/65f9f025febece71fefc8521
*/
module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  try {
    if (!id) {
      return res.status(400).json({ error: "Please provide the user id...!" });
    }
    const user = await Users.findById(id).select("-password");
    console.log("user: ", user);
    if (!user) {
      return res.status(404).json({ error: "User not found...!" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error...!" });
  }
};

// module.exports.validateUser = async (req, res) => {

// generate OTP
module.exports.generateOTP = async (req, res) => {
  try {
    req.app.locals.OTP = await otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log("G", req.app.locals.OTP);
    const user = req.user;
    await sendMail({
      email: user.email,
      subject: "Verify OTP",
      message: `Your Password Recovery OTP is: <b >${req.app.locals.OTP}</b> Verify and Recover your password.`,
    });
    return res.status(201).json({
      success: true,
      message: `Please check your email:${user.email} to get the OTP`,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error...!" });
  }
};

//verify the OTP
module.exports.verifyOTP = async (req, res) => {
  try {
    const { code } = req.body;
    console.log("V", req.app.locals.OTP);
    if (code === req.app.locals.OTP) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(201).send({ msg: "OTP Verify successfully...!" });
    } else {
      return res.status(400).send({ error: "Invalid OTP" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error...!" });
  }
};
// I only provide the access of this route only once to reset the password
// successfully redirect the user when the OTP is valid
module.exports.createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(404).send({ error: "Session expired!" });
};

module.exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ error: "Session expired!" });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      await Users.findByIdAndUpdate(user._id, { password: hashPassword });
      req.app.locals.resetSession = false;
      return res.status(201).send({ msg: "Password reset successful!" });
    } catch (error) {
      return res.status(500).send({ error: "Unable to hash the password" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
};
