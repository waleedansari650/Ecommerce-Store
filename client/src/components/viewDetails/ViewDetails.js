import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificOrder } from "../../services/orderService";
import Loader from "../loader/Loader";
const ViewDetails = () => {
  const dummyImageUrl = "https://via.placeholder.com/300";
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.getproductsdata.specificOrder);
  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 70) {
      return words.slice(0, 50).join(" ") + "...";
    }
    return description;
  };

  useEffect(() => {
    setLoading(true);
    const getOrder = dispatch(getSpecificOrder(params));
    getOrder
      .then((data) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log("error : ", error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Loader isLoading={loading} />
      <Container maxWidth="lg" style={{ marginTop: "3rem" }}>
        <Grid container spacing={2}>
          {/* Product Images and Details Section */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {/* Product Images and Details */}
              {order &&
                order.products &&
                order.products.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Grid container spacing={2}>
                      {/* Product Image */}
                      <Grid item xs={12} md={4}>
                        <Paper
                          elevation={3}
                          style={{
                            borderRadius: 10,
                            overflow: "hidden",
                            position: "relative",
                            marginTop: "2rem",
                            height: "300px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <img
                            src={
                              item.productId.image
                                ? item.productId.image
                                : dummyImageUrl
                            }
                            alt="Product"
                            style={{
                              width: "100%",
                              height: "100%",
                              transition: "all 0.3s ease-in-out",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          />
                        </Paper>
                      </Grid>
                      {/* Product Details */}
                      <Grid item xs={12} md={8}>
                        <Card
                          variant="outlined"
                          style={{
                            height: "100%",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <CardContent>
                            <Typography
                              variant="h5"
                              align="center"
                              gutterBottom
                            >
                              Product Details
                            </Typography>
                            <Divider />
                            <List>
                              <ListItem>
                                <ListItemText primary="Product Name" />
                                {item.productId.name}
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="Product Category" />
                                {item.productId.category}
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="Product Description" />
                              </ListItem>
                              <ListItem>
                                <Typography variant="body2">
                                  <span style={{ marginLeft: "2rem" }}>
                                    {truncateDescription(
                                      item.productId.description
                                    )}
                                  </span>
                                </Typography>
                              </ListItem>

                              <ListItem>
                                <ListItemText primary="Product Quantity" />
                                {item.quantity}
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="Product Price" />
                                {item.productId.price}
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="Total Amount" />
                                {item.productId.price * item.quantity}
                              </ListItem>
                            </List>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          {/* User Details Section */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                  Order Details
                </Typography>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemText primary="User Name" />
                    {order?.buyer?.name}
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Email" />
                    {order?.buyer?.email}
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Address" />
                    <span style={{ marginLeft: "4rem" }}>
                      {" "}
                      {order?.address?.houseNo} {order?.address?.street}{" "}
                      {order?.address?.town} {order?.address?.city}{" "}
                      {order?.address?.province}
                    </span>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Total Products" />
                    {order?.products?.length}
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Total Quantity" />
                    {order?.totalQuantity}
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Total Price" />
                    {order?.totalPrice}
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Status" />
                    {order?.payment?.transaction?.status}
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default ViewDetails;
