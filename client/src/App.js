import React from 'react';
import './index.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import PageNotFound from './components/pageNotFound/PageNotFound';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import AddProduct from './components/addProduct/AddProduct';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import ActivationPage from './components/activationPage.js/ActivationPage';
function App() {
  return (
    <>
  <Routes>
  <Route path='*' element={<PageNotFound/>}/>
    <Route path="/" exact element={<Home />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/addProduct" element={<AddProduct />} />
    <Route path="/products" element={<Products />} />
    <Route path="/cart" element={<Cart />} />
    <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
  </Routes>
      
    </>
  );
}

export default App;
