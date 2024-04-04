import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Footer() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body1" color="inherit">
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
