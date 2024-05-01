import React, {useState, useEffect} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.getproductsdata.orders);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    const getOrder = dispatch(getOrders());
    getOrder
      .then((data) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log("error : ", error);
        setLoading(false);
      });
  },[])
  const handleViewDetail = (id) =>{
    navigate(`/view-details/${id}`);
  }
  return (
    <>
    <Navbar />
    
    <Loader isLoading={loading} />
      
        <div
      style={{
        margin: "4rem auto",
        position: "relative",
        width: "fit-content",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>All Orders</h2>
      </div>
      <div style={{ overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Buyer Name</TableCell>
                <TableCell>Total Products</TableCell>
                <TableCell>Total Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell></TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  { orders.length > 0 ? (
    orders.map((order, index) => (
      <TableRow key={index}>

        <TableCell>{index + 1}</TableCell>
        <TableCell>{order._id}</TableCell>
        <TableCell>{order.buyer.name}</TableCell>
        <TableCell>{order.products.length}</TableCell>
        <TableCell>{order.totalQuantity}</TableCell>
        <TableCell>$ {order.totalPrice}</TableCell>
        <TableCell>{order.payment.success.toString()}</TableCell>
        <TableCell>{order.status}</TableCell>
        <TableCell colSpan={3}>
        <Button onClick={()=>{handleViewDetail(order._id)}} variant="contained" style={{ marginLeft: '0.5rem' }} color="warning">
            View Details
          </Button>
          <Button variant="contained" style={{ marginLeft: '0.5rem' }} color="primary">
            Delivered
          </Button>
          <Button variant="contained" style={{ marginLeft: '0.5rem' }} color="error">
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={8}>No Orders Found</TableCell>
    </TableRow>
  )}
</TableBody>

          </Table>
        </TableContainer>
      </div>
    </div>
    
    <Footer />
    </>
  );
};

export default Orders;
