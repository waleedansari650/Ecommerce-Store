import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Fade } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  removeProductToCart,
  decreaseQuantity,
} from "../../redux/actions/productActions";

const Cart = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.getproductsdata.cartItems);
  const totalProductPrice = useSelector((state) => state.getproductsdata.totalPrice);

  useEffect(() => {
    const storeCartItems = localStorage.getItem("cartItems");
    if (storeCartItems) {
      setProducts(JSON.parse(storeCartItems));
    }
  }, []);
  useEffect(() => {
    setProducts(cartItems);
  }, [cartItems]);

  const handleToRemoveProduct = (id) => {
    dispatch(removeProductToCart(id));
    setProducts(products.filter((product) => product.product._id !== id));
  };
  const handleQuantityChange = (product, mode) => {
    if (mode === "increment") {
      dispatch(increaseQuantity(product.product._id));
    }
    if (mode === "decrement") {
      
      dispatch(decreaseQuantity(product.product._id));
    }
  };

  return (
    <>
      <Navbar />
      <Box p={4} style={{ margin: "auto", maxWidth: 900 }}>
        <Box p={4}>
          <Fade
            in={showAnimation}
            timeout={1000}
            onExited={() => setShowAnimation(false)}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              Your Cart
            </Typography>
          </Fade>
          <Grid container spacing={2}>
            {/* Product cards go here */}
          </Grid>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            style={{ justifyContent: "space-between" }}
          >
            <Typography variant="h6">
              Total Products: {products?.length}
            </Typography>
            <Typography variant="h6">
              Total Quantity:{" "}
              {products
                ? products.reduce((total, item) => total + item.quantity, 0)
                : "0"}
            </Typography>
            <Typography variant="h6"></Typography>
            <Typography variant="h6">
              Total Price: $ {totalProductPrice ? totalProductPrice : 0}
            </Typography>
          </Box>
        </Box>
        {products ? (
          <Grid
            container
            spacing={2}
            style={{
              backgroundColor: "white",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {products.map((product, index) => (
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
                    Price: $ {product.product.price * product.quantity}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <span style={{ width: "30%", float: "left" }}>
                      Quantity: {product.quantity}
                    </span>
                    <Button
                      style={{ padding: "0px" }}
                      variant="outlined"
                      onClick={() => handleQuantityChange(product, "decrement")}
                    >
                      -
                    </Button>
                    <Button
                      style={{ padding: "0px ", margin: "0 1rem" }}
                      variant="outlined"
                      onClick={() => handleQuantityChange(product, "increment")}
                    >
                      +
                    </Button>
                  </Typography>
                  <Button
                    style={{ marginTop: "1rem" }}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleToRemoveProduct(product.product._id);
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No products in cart</Typography>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Cart;
