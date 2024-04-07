import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Modal from "../modal/Modal";
const ProductTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modelMode, setModelMode] = useState('add');

  const openAddProductModel = () =>{
    setModelMode("add")
    setModalOpen(true);
  }
  const openUpdateModal = () => {
    setModelMode("update")
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
 

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
        <h2 style={{ marginBottom: "1rem" }}>All Products</h2> {/* Title */}
        <Button
          variant="contained"
          color="primary"
          onClick={openAddProductModel}
        >
          Add Product
        </Button>{" "}
        {/* Button */}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Product Category</TableCell>
              <TableCell>Product Image</TableCell>
              <TableCell>Product Stock</TableCell>
              <TableCell colSpan={2}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
              <TableCell>1</TableCell>
              <TableCell>iPhone</TableCell>
              <TableCell>najgnakjgjkangkja</TableCell>
              <TableCell>515</TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqqYmJ_G_0wyluD8zPfrKIiHgpQL74WY7Bwwz8FTFtZA&s"
                  alt="Avatar 1"
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
              </TableCell>
              <TableCell>12</TableCell>
              <TableCell colSpan={2}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 8 }}
                  onClick={openUpdateModal}
                >
                  Update
                </Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} modelMode={modelMode} setModalOpen= {setModalOpen}/>
      
    </div>
  );
};

export default ProductTable;
