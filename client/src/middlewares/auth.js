import React from "react";
import { Navigate } from "react-router-dom";

export const AuthorizeUser = ({ children }) => {
  let token = localStorage.getItem("token");
  
  if (!token) {
   
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
