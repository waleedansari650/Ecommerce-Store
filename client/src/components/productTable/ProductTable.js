import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../services/producytServices";
import AnimateSkeleton from "../animateSkeleton/AnimateSkeleton";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const ProductTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modelMode, setModelMode] = useState('add');
  const [updateProduct, setUpdateProduct] = useState({}); // Store product data to update
  const products = useSelector((state)=> state.getproductsdata.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openAddProductModel = () =>{
    setModelMode("add")
    setModalOpen(true);
  }

  const openUpdateModal = (product) => {
    setUpdateProduct(product);
    setModelMode("update")
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleDeleteProduct  = (id) =>{
   let deletePromise=  dispatch(deleteProduct(id));
    toast.promise(deletePromise, {
      loading: "Deleting Product...",
      success: (response)=> <b> {response.message}</b>,
      error: (error)=> <b>{error.error}</b>,
    })  
 
  }
  useEffect(() => {
    let getProductsPromise = dispatch(getProducts());
  
    getProductsPromise.catch((error) => {
      if (error.error === "Authentication Failed!") {
        console.error("Authentication failed:", error.error);
        toast.error("Authentication failed. Please login again.");
      setTimeout(() => {
        navigate("/signin");
      })
      } else {
        // Handle other errors
        console.error("Error fetching products:", error);
      }
    });
  }, []);

  return (
    <div
      style={{
        margin: "4rem auto",
        position: "relative",
        width: "fit-content",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>All Products</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={openAddProductModel}
        >
          Add Product
        </Button>
      </div>
      <div style={{ overflowX: 'auto' }}>
      <Toaster position="top-center" reverseOrder={false} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell style={{ maxWidth: 200 }}>Product Description</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Product Category</TableCell>
                <TableCell>Product Image</TableCell>
                <TableCell>Product Stock</TableCell>
                <TableCell colSpan={2}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { products?.map((product) => (
                <TableRow key={product._id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</TableCell>
                  <TableCell style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.category}</TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt="Product"
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell colSpan={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: 8 }}
                      onClick={() => openUpdateModal(product)}
                    >
                      Update
                    </Button>
                    <Button variant="contained" color="error" onClick={()=>{
                      handleDeleteProduct(product._id)
                    }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        
        </TableContainer>
      </div>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} modelMode={modelMode} setModalOpen= {setModalOpen} updateProduct={updateProduct} />
    </div>
  );
};

export default ProductTable;
