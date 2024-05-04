const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalQuantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    payment: {},
    address : {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      default: "Not Process",
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
