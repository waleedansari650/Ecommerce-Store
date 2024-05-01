const express = require("express");
const Address = require("../models/Address");
const Cart = require("../models/Cart");

module.exports.addAddressController = async (req, res) =>{
    try {
        const {houseno , street, town, city, province} = req.body;
        const userId = req.userId;
        const addressExist = await Address.find({user: userId}); 
        if(addressExist){
             await Address.deleteMany({user: userId});
        }
        const address = await Address.create({
            user: req.userId,
            houseno,
            street,
            town,
            city,
            province
        });
        return res.status(200).json({
            success: true,
            message: "Address added successfully...!",
            data: address,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports.getAddressController = async (req, res)=>{
    try {
        const address = await Address.findOne({user: req.userId}).select("-user");
        return res.status(200).json({
            success: true,
            data: address,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports.getOrderController = async(req, res)=>{
    try {
        const orders = await Cart.find({buyer : req.userId}).populate('buyer');
        console.log(orders);
        return res.status(200).json({
            success : true,
            data : orders
        })
    } catch (error) {
        return res.status().json({error : error.message})
    }
}
module.exports.getSpecificOrder = async(req, res)=>{
    const {id} = req.params;
    try {
        const order = await Cart.findOne({_id: id}).populate('buyer').populate('products.productId');
        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
   
}


