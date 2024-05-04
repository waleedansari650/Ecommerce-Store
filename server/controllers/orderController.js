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
module.exports.deleteSpecificProduct = async(req, res) =>{
    const {id} = req.params;
    try {
        const deleteOrder = await Cart.findOneAndDelete({_id: id});
        if(!deleteOrder){
            return res.status(404).json({error: "Order not found"});
        }
        return res.status(200).json({
            success: true,
            message: "Order deleted successfully...!"
        });
    } catch (error) {
        return res.json(400).json({error : error.message});
    }
}

module.exports.deliverSpecificProduct = async(req, res) =>{
    try {
        const {id, value} = req.body;
        const order = await Cart.findOneAndUpdate(
            {_id : id},
             {$set : {status : value}},
             { new : true});
        if(!order){
            return res.status(404).json({error: "Order not found"});
        }
        return res.status(200).json({
            success: true,
            message: "Order delivered successfully...!",
            data : order,
        });
    } catch (error) {
        console.log("error");
    }
}
         
