import { AppBar, Toolbar, Typography, Grid } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="relative" color="primary" style={{ top: "50vh", bottom: 0,  }}>
      <Toolbar style={{postition : "absolute"}}>
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
};

export default Footer;
