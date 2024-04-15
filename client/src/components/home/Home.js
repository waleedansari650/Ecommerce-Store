import Carousal from "../carousal/Carousal";
import React from "react";
import Navbar from "../header/Navbar";
import ProductSection from "./ProductSection";
import Footer from "../footer/Footer";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
 
  return (
    <>
      <Navbar />
      <div style={{ overflowX: 'auto' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <Carousal />
      </div>
      <ProductSection />
      <Footer />
    </>
  );
};

export default Home;
