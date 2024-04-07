const express = require("express");
const Products = require('../models/Products');

module.exports.addProduct = async(req, res)=>{
const {name, description, price, category, stock, sold} = req.body;
return res.status(200).json({message : "add product api is hitting...!    "});




}

module.exports.deleteProduct = async(req, res)=>{
    return res.status(200).json({message : "delete product api is hitting...!    "});
}
module.exports.updateProduct = async(req, res)=>{
    return res.status(200).json({message : "update product api is hitting...!    "});
}
module.exports.getProducts = async(req, res)=>{
    return res.status(200).json({message : " getproducts api is hitting...!    "});
}
module.exports.getSpecificProduct = async(req, res)=>{
    return res.status(200).json({message : "getSpecific product api is hitting...!    "});
}


