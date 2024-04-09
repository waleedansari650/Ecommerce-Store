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
  try {
    const id = req.params.id;
    const product = await Products.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({error : "Product not found...!"});
    }
    return res.status(200).json({
      success : true,
      message : "Product deleted successfully...!",
      data : product
    })
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

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
module.exports.updateProduct = async (req, res) => {
  console.log("params : ", req.params.id)
  const { name, description, price, category, stock} = req.body;
console.log("req.body : ",req.body)
  try {
    let newProduct = {}
    if (req.file) {
        newProduct = { name, description, price, category, image: `http://localhost:4000/uploads/${req.file.filename}`, stock }
    } else {
        newProduct = { name, description, price, category,  stock};
    }
    let product = await Products.findById(req.params.id);
    if (!product) {
        return res.status(400).json({ message: "The Product cannot exist" })
    }
    product = await Products.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });
    return res.status(200).json({
      success : true,
      message : "Product Added Successfully...!",
      data : product
  })
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Some error occurred" })
}
};
module.exports.getProducts = async (req, res) => {
  try {
    const products  = await Products.find();
    if(!products){
      return res.status(404).json({error : "No products found...!"});
    }
    return res.status(200).json({
      success : true,
      message : "Products fetched successfully...!",
      data : products
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error...!" });
  }
 
};
module.exports.getSpecificProduct = async (req, res) => {
  return res
    .status(200)
    .json({ message: "getSpecific product api is hitting...!    " });
};
