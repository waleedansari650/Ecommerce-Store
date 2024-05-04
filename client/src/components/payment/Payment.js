import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, payment } from "../../services/producytServices";
import DropIn from "braintree-web-drop-in-react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { getAddress } from "../../services/orderService";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import Loader from "../loader/Loader";

const Payment = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.getproductsdata.session);
  const cartItems = useSelector((state) => state.getproductsdata.cartItems);
  const totalProductPrice = useSelector(
    (state) => state.getproductsdata.totalPrice
  );
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPaymentDisabled, setIsPaymentDisabled] = useState(true);
  const [clientToken, setClientToken] = useState("");
  const navigate = useNavigate();
  const address = useSelector((state) => state.getproductsdata.address);
  useEffect(() => {
    setIsPaymentDisabled(!instance || !auth); // Disable button if instance or auth is null
  }, [instance, auth]);
  useEffect(() => {
    getToken(setClientToken);
  }, [auth]);
  useEffect(() => {
    setLoading(true);
    const fetchAddress = dispatch(getAddress());
    fetchAddress.then(()=>{
      console.log("Address fetched successfully");
      setLoading(false);
    }).catch(()=>{
      console.log("Error fetching address");
      setLoading(false);
    })

  }, []);
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      setLoading(true);
      const paymentPromise = dispatch(
        payment(nonce, cartItems, totalProductPrice, address)
      );

      paymentPromise
        .then(() => {
          setLoading(false);
          toast.promise(paymentPromise, {
            loading: "Order dispatching...!",
            success: (response) => <b>{response.message}</b>,
            error: (error) => <b>{error.error}</b>,
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(`🦄 ${error}`);
      // setLoading(false);
    }
  };
  const handleInstanceCreation = (instance) => {
    setInstance(instance);
    // Add event listener to enable payment button when all fields are filled
    instance.on("paymentOptionSelected", () => {
      setIsPaymentDisabled(false);
    });
  };
  return (
    <>
      <Navbar />
      <Loader isLoading={loading} />
      <Toaster position="top-center" reverseOrder={false} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!clientToken || !cartItems.length > 0 ? (
          ""
        ) : (
          <>
            <Box
              m={2}
              p={2}
              bgcolor="#f5f5f5"
              borderRadius={8}
              boxShadow={3}
              width={500}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Address Details
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    House No: <span>{address?.houseno}</span>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Street: <span>{address?.street}</span>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Town: {address?.town}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    City: {address?.city}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Province: {address?.province}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <DropIn
              style={{ maxWidth: "50%" }}
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={handleInstanceCreation}
            />
            <Button
              onClick={handlePayment}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isPaymentDisabled}
            >
              {loading ? "Processing..." : "Make Payment"}
            </Button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Payment;
