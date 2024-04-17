import React from "react";
import { Navigate } from "react-router-dom";

export const AuthorizeUser = ({ children }) => {
  let token = localStorage.getItem("token");
  
  if (!token) {
    // Display error toast when user is not logged in
   
    // Redirect to home page
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
