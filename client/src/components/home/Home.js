import Carousal from "../carousal/Carousal";
import React from "react";
import Navbar from "../header/Navbar";
import ProductSection from "./ProductSection";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Carousal />
      <ProductSection />
      <Footer />
    </>
  );
};

export default Home;
