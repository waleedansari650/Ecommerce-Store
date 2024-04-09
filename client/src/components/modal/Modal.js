import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Avatar,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PhotoCamera } from "@mui/icons-material";
import PreviewImage from "../../helper/PreviewImage";
import { addProduct, updateExistingProduct } from "../../services/producytServices";
import { useDispatch } from "react-redux";

const Model = ({ isModalOpen, closeModal, modelMode, setModalOpen, updateProduct }) => {
  const [productImage, setProductImage] = useState();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Product name is required")
      .min(4, "Name must be at least 4 characters long."),
    description: Yup.string()
      .required("Description is required")
      .min(40, "Description must be at least 40 characters long."),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be a positive number."),
    category: Yup.string()
      .required("Category is required")
      .min(4, "Category must be at least 4 characters long."),
    stock: Yup.number()
      .required("Stock is required")
      .min(0, "Stock must be a positive number."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values = { ...values, profile: productImage };
      let productPromise;
      if (modelMode === "add") {
        productPromise = dispatch(addProduct(values));

        toast.promise(productPromise, {
          loading: "Adding Product...",
          success: (response) => <b> {response.message}</b>,
          error: (error) => <b>{error.error}</b>,
        });
        productPromise
          .then(() => {
            setTimeout(() => {
              formik.resetForm();
              setProductImage("");
              setModalOpen(false);
            }, 1000);
          })
          .catch((error) => {
            console.log("error : ", error);
          });
      } else {
        const id = updateProduct._id;
        values = { ...values, profile: productImage, id };
        productPromise =  dispatch(updateExistingProduct(values));
        toast.promise(productPromise, {
          loading: "Updating Product...",
          success: (response) => <b> {response.message}</b>,
          error: (error) => <b>{error.error}</b>,
        });
        productPromise
          .then(() => {
            setTimeout(() => {
              setModalOpen(false);
            }, 1000);
          })
          .catch((error) => {
            console.log("error : ", error);
          });
      }
    },
  });

  useEffect(() => {
    if (isModalOpen && modelMode === "update" && updateProduct) {
      setInitialFormValues(updateProduct);
    } else {
      formik.resetForm();
      setProductImage("");
    }
  }, [isModalOpen, modelMode, updateProduct]);

  const setInitialFormValues = (product) => {
    formik.setValues({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      stock: product.stock || "",
    });
    setProductImage(product.image);
  };

  const handleAvatarChange = async (event) => {
    setProductImage(event.target.files[0]);
  };

  const defaultTheme = createTheme();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Toaster position="top-center" reverseOrder={false} />
        <Modal
          style={{ overflowY: "scroll", maxHeight: "100%" }}
          open={isModalOpen}
          onClose={closeModal}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxWidth: 600,
              width: "80vw", // Set the width to be responsive
              maxHeight: "80vh", // Set the max height to prevent overflow
              overflowY: "auto", // Enable vertical scrolling if content exceeds height
            }}
          >
            <h2 style={{ textAlign: "center" }}>
              {modelMode === "update" ? "Update Product" : "Add Product"}
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <label
                htmlFor="avatar-input"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                {productImage ? (
                  <PreviewImage file={productImage} />
                ) : (
                  <Avatar
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: "secondary.main",
                      marginRight: "0.5rem", // Add margin right for spacing
                    }}
                  />
                )}

                <input
                  accept="image/*"
                  id="avatar-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <Button
                  variant="contained"
                  component="span"
                  style={{
                    borderRadius: "50%",
                    minWidth: 0,
                    padding: 0,
                  }}
                >
                  <PhotoCamera />
                </Button>
              </label>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Enter Product Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Enter Product Description"
                name="description"
                autoComplete="description"
                autoFocus
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Enter Product Price"
                name="price"
                autoComplete="price"
                autoFocus
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="category"
                label="Enter Product Category"
                name="category"
                autoComplete="category"
                autoFocus
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="stock"
                label="Enter Product Stock"
                name="stock"
                autoComplete="stock"
                autoFocus
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {modelMode === "add" ? "Add Product" : "Update Product"}
              </Button>
            </form>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default Model;

