const express = require("express");
const Products = require("../models/Products");

module.exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let url = `http://localhost:4000/uploads/${req.file.filename}`;
    const product = await Products.create({
      name,
      description,
      price,
      category,
      image: url,
      stock,
    });
    return res.status(200).json({
        success : true,
        message : "Product added successfully...!",
        data : product
    })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  return res
    .status(200)
    .json({ message: "delete product api is hitting...!    " });
};
module.exports.updateProduct = async (req, res) => {
  return res
    .status(200)
    .json({ message: "update product api is hitting...!    " });
};
module.exports.getProducts = async (req, res) => {
  return res
    .status(200)
    .json({ message: " getproducts api is hitting...!    " });
};
module.exports.getSpecificProduct = async (req, res) => {
  return res
    .status(200)
    .json({ message: "getSpecific product api is hitting...!    " });
};
