import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './ProductSection.css'; // Import CSS file
import Cards from '../card/Cards';  

function ProductSection() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" style={{marginTop : '1rem'}} component="h2" gutterBottom className='heading'>
            Products
          </Typography>
        </Grid>
        <Cards />
      </Grid>
    </Container>
  );
}

export default ProductSection;
