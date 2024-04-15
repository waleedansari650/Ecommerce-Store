import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './ProductSection.css'; // Import CSS file
import Cards from '../card/Cards';  
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { getProducts } from "../../services/producytServices";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
function ProductSection() {
  const products = useSelector((state)=> state.getproductsdata.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" style={{marginTop : '1rem'}} component="h2" gutterBottom className='heading'>
            Products
          </Typography>
        </Grid>
        {
          products? (products.map((item, index)=>{
            return (
              <Cards key={index} item={item}/>
            )
          }
          )) : ""
        }
      </Grid>
    </Container>
  );
}

export default ProductSection;
