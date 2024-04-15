const express = require("express");
const Cart = require("../models/Cart");
const Products = require("../models/Products");

module.exports.addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const user = req.userId;
  
      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).send({ error: "Product not found!" });
      }
  
      let cart = await Cart.findOne({ user });
      if (!cart) {
        cart = new Cart({ user, items: [] });
      }
  
      const parsedQuantity = parseInt(quantity); // Parse the quantity to a number
  
      const existingItemIndex = cart.items.findIndex(item => String(item.product) === productId);
      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += parsedQuantity;
      } else {
        cart.items.push({ product: productId, quantity: parsedQuantity });
      }
  
      await cart.save();
  
      return res.status(200).json({
        success: true,
        message: "Product added to cart successfully!",
        data: cart,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };