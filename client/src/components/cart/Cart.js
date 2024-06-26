import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Fade } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProductToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { getToken, payment } from "../../services/producytServices";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.getproductsdata.session);
  const cartItems = useSelector((state) => state.getproductsdata.cartItems);
  const navigate = useNavigate();
  //payment

  const totalProductPrice = useSelector(
    (state) => state.getproductsdata.totalPrice
  );

  const handleToRemoveProduct = (id) => {
    let removeProduct = dispatch(removeProductToCart(id));
    if (removeProduct.payload === id) {
      toast.success("Product Remove Successfuly...!");
    } else {
      toast.error("Product Not Found");
    }
  };
  const handleQuantityChange = (productId, mode) => {
    if (mode === "increment") {
      dispatch(increaseQuantity(productId));
    }
    if (mode === "decrement") {
      dispatch(decreaseQuantity(productId));
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <Box p={4} style={{ margin: "auto", maxWidth: 900 }}>
        <Box p={4}>
          <Fade in timeout={1000}>
            <Typography variant="h5" color="primary" gutterBottom>
              Your Cart
            </Typography>
          </Fade>
          <Grid container spacing={2}>
            {/* Map through cart items */}
            {cartItems?.map((product, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  p={2}
                  borderRadius={1}
                  bgcolor="background.paper"
                  style={{ position: "relative" }}
                >
                  <img
                    src={product.product.image}
                    alt="Product"
                    style={{
                      maxWidth: 200,
                      maxHeight: 100,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: 8,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
                    }}
                  ></div>
                  <Typography variant="h6" gutterBottom>
                    {product.product.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Price: $ {product.product.price}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Total Price: $ {product.product.price * product.quantity}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <span style={{ width: "30%", float: "left" }}>
                      Quantity: {product.quantity}
                    </span>
                    <Button
                      style={{ padding: "0px" }}
                      variant="outlined"
                      onClick={() =>
                        handleQuantityChange(product.product._id, "decrement")
                      }
                    >
                      -
                    </Button>
                    <Button
                      style={{ padding: "0px ", margin: "0 1rem" }}
                      variant="outlined"
                      onClick={() =>
                        handleQuantityChange(product.product._id, "increment")
                      }
                    >
                      +
                    </Button>
                  </Typography>
                  <Button
                    style={{ marginTop: "1rem" }}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleToRemoveProduct(product.product._id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">
              Total Products: {cartItems.length}
            </Typography>
            <Typography variant="h6">
              Total Quantity:{" "}
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </Typography>
            <Typography variant="h6">
              Total Price: $ {totalProductPrice ? totalProductPrice : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      {
        cartItems.length > 0 &&  (
          <Link to={'/add-address'} >
        <Button style={{width : "20rem"}}  variant="contained" sx={{ mt: 3, mb: 2 }}>
          Place Order
        </Button>
      </Link>
        )
      }
      
      </div>
      <Footer />
    </>
  );
};

export default Cart;
