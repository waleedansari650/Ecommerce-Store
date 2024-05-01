const express = require("express");
const Products = require("../models/Products");
const paymentGateway = require("../middlewares/paymentGateway");
const Cart = require("../models/Cart");
// export const addProduct = () =>{}
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
      success: true,
      message: "Product added successfully...!",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found...!" });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully...!",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// module.exports.addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, stock } = req.body;
//     let url = `http://localhost:4000/uploads/${req.file.filename}`;
//     const product = await Products.create({
//       name,
//       description,
//       price,
//       category,
//       image: url,
//       stock,
//     });
//     return res.status(200).json({
//       success: true,
//       message: "Product added successfully...!",
//       data: product,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
module.exports.updateProduct = async (req, res) => {
  console.log("params : ", req.params.id);
  const { name, description, price, category, stock } = req.body;
  console.log("req.body : ", req.body);
  try {
    let newProduct = {};
    if (req.file) {
      newProduct = {
        name,
        description,
        price,
        category,
        image: `http://localhost:4000/uploads/${req.file.filename}`,
        stock,
      };
    } else {
      newProduct = { name, description, price, category, stock };
    }
    let product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "The Product cannot exist" });
    }
    product = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Product Added Successfully...!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Some error occurred" });
  }
};
module.exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products) {
      return res.status(404).json({ error: "No products found...!" });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully...!",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error...!" });
  }
};
module.exports.getSpecificProduct = async (req, res) => {
  return res
    .status(200)
    .json({ message: "getSpecific product api is hitting...!    " });
};
//gateway controllers
//token
module.exports.braintreeTokenController = async (req, res) => {
  try {
    const gateway = await paymentGateway();
  
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports.brainTreePaymentController = async (req, res) => {
  try {
    const gateway = await paymentGateway();
    const { cartItems, nonce, totalProductPrice, address } = req.body; // Destructure cartItems from req.body
  

    // Ensure that cartItems is an array
    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ error: 'Invalid cartItems format' });
    }

    let newTransaction = gateway.transaction.sale(
      {
        amount: totalProductPrice,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (result) {
          try {
            const orderProducts = cartItems.map((item)=>({
              productId : item.productId,
              quantity : item.quantity,
            }));
            const order = new Cart({
              products: orderProducts, 
              totalQuantity : cartItems.reduce((total, items,)=> total + items.quantity, 0),
              address : address,
              totalPrice : totalProductPrice,
              payment: result,
              buyer: req.userId,
              
            });
            await order.save();
            return res.status(201).json({ success: true, order, message : "Order Placed Successfuly...!" });
          } catch (error) {
            console.error("Error creating order : ", error);
            return res.status(500).json({ error: "Error creating order" });
          }
        } else {
          console.error("Transaction error:", error);
          return res.status(500).json({ error: "Transaction error" });
        }
      }
    );
  } catch (error) {
    console.error("Braintree error:", error);
    return res.status(500).json({ error: "Braintree error" });
  }
};


