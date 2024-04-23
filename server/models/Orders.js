const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
    buyer: {
      type: mongoose.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "cancel"],
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Orders || mongoose.model("Orders", orderSchema);
