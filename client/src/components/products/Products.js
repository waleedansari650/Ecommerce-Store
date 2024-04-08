import React, { useState } from "react";
import Navbar from "../header/Navbar";
import ProductTable from "../productTable/ProductTable";
import Footer from "../footer/Footer";

const Products = () => {

  return (
   <>
     <Navbar />
    <ProductTable/>
    <Footer />
   </>
   
  );
};

export default Products;
