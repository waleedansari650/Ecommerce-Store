import React, { useEffect } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import ActivationPage from "./components/activationPage.js/ActivationPage";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import OTP from "./components/otp/OTP";
import ResetPassword from "./components/resetPassword/ResetPassword";
import { AuthorizeUser } from "./middlewares/auth";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Profile from "./components/profile/Profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/OTP" element={<OTP />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/products" element={<AuthorizeUser><Products /></AuthorizeUser>} />
        <Route path="/cart" element={<AuthorizeUser><Cart /></AuthorizeUser>} />
        <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        
      </Routes>
    </>
  );
}

export default App;
