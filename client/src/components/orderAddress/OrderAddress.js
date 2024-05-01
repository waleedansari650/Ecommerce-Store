import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addAddress } from "../../services/orderService";


const OrderAddress = () => {
  const disaptch = useDispatch();
  
  const navigate  = useNavigate();
  const validationSchema = Yup.object().shape({
    houseno: Yup.string()
      .required("house number is required")
      .min(3, "house number atleast 3 character long."),
      street: Yup.string()
      .required("street number is required"),
      town: Yup.string()
      .required("town is required"),
      city: Yup.string()
      .required("city is required"),
      province: Yup.string()
      .required("province is required"),
  });
  const formik = useFormik({
    initialValues: {
      houseno: "",
      street: "",
      town: "",
      city: "",
      province: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values) =>{
      try {
        if(values){
          let addressPromise = addAddress(values);
          toast.promise(addressPromise, {
            loading : "Adding Address....",
            success : (response)=> <b>{response.message}</b>,
            error : (error)=> <b>{error.error}</b>
          })
          addressPromise.then((res)=>{
            formik.resetForm();
            setTimeout(() => {
              navigate("/payment");
            }, 2000);
          }).catch((error)=>{
            console.log(error);
          })
        }
      } catch (error) {
        
      }
    }
  });

  return (
    <>
      <Navbar />
      <Box
        style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", marginBottom : "2rem" }}

      >
      <Toaster position="top-center" reverseOrder={false} />
      <h2><b>Dispatch Order Detail</b></h2>
      <span>Enter your address</span>
        <form style={{marginTop : "2rem", width : "50%"}} onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="houseno"
            label="Enter House Nm."
            name="houseno"
            autoComplete="houseno"
            autoFocus
            value={formik.values.houseno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.houseno && Boolean(formik.errors.houseno)}
            helperText={formik.touched.houseno && formik.errors.houseno}
          />
       <TextField
            margin="normal"
            required
            fullWidth
            id="street"
            label="Enter Street."
            name="street"
            autoComplete="street"
            autoFocus
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="street"
            label="Enter Town"
            name="town"
            autoComplete="town"
            autoFocus
            value={formik.values.town}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.town && Boolean(formik.errors.town)}
            helperText={formik.touched.town && formik.errors.town}
          />
             <TextField
            margin="normal"
            required
            fullWidth
            id="street"
            label="Enter City"
            name="city"
            autoComplete="city"
            autoFocus
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
            <TextField
            margin="normal"
            required
            fullWidth
            id="street"
            label="Enter Province"
            name="province"
            autoComplete="province"
            autoFocus
            value={formik.values.province}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.province && Boolean(formik.errors.province)}
            helperText={formik.touched.province && formik.errors.province}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          > Add Address</Button>
        </form>
      </Box>
      
      <Footer />
    </>
  );
};

export default OrderAddress;
