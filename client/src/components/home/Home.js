import Carousal from "../carousal/Carousal";
import React, { useState } from "react";
import Navbar from "../header/Navbar";
import ProductSection from "./ProductSection";
import Footer from "../footer/Footer";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../loader/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
 
  return (
    <>
      <Navbar />
      <Loader isLoading={loading} />
      <div style={{ overflowX: 'auto' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <Carousal />
      </div>
      <ProductSection setLoading={setLoading} />
      <Footer />
    </>
  );
};

export default Home;
