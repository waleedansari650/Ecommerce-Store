import React, { useEffect } from "react";
import { Avatar, Typography, Paper, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/authenticateServies";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";

const paperStyle = {
  padding: "20px",
  textAlign: "center",
  maxWidth: "400px",
  margin: "auto",
  marginTop: "100px",
};

const avatarStyle = {
  width: "100px",
  height: "100px",
  marginBottom: "20px",
};

const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state.getproductsdata.user);
    const navigate = useNavigate();
    useEffect(()=>{
       let getUserPromise =  dispatch(getUser());
       getUserPromise.catch((error) => {
      if (error.error === "Authentication Failed!") {
        console.error("Authentication failed:", error.error);
        toast.error("Authentication failed. Please login again.");
      setTimeout(() => {
        navigate("/signin");
      })
      } else {
        // Handle other errors
        console.error("Error fetching user:", error);
      }
    });
    },[])

  const handleGoBack = () => {
    // Go back to the previous URL
    navigate(-1);
  };

  return (
    <>
    <Navbar />
    <Paper style={paperStyle}>
      <Avatar style={avatarStyle} src={userData.user?.profile} alt="Profile" />
      <Typography variant="h5" gutterBottom>
        {userData.user?.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {userData.user?.email}
      </Typography>
      <Button onClick={handleGoBack}  variant="outlined" color="primary">Back</Button>
    </Paper>
    <Footer />
    </>
  );
};

export default Profile;
