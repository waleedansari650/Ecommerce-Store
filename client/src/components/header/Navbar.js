import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Add Product", "Products"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const settings = ["Sign in", "Sign up"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null); 
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if(page === "Home"){
        navigate('/');
    }   else if(page === "Add Product"){
        navigate('/addProduct');
    }   else if(page === "Products"){
        navigate('/products');
    } else if(page === 'cart'){
    navigate('/cart');

  }
  };

  const handleCloseUserMenu = (setting) => {
    if(setting === "Sign in"){
        navigate('/signin');
    }   else if(setting === "Sign up"){
        navigate('/signup');
    }  
  };

  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  // console.log("Function callled");
 
  return (
    <>
        <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            style={{ cursor: "pointer" }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq-AmpT1wT2ZrZ4Jx_Suv2Sp2NSTiWaX1kYw&usqp=CAU"
              alt="Logo"
              style={{
                marginRight: 10,
                borderRadius: "50%", // Rounded corners
                width: "40px", // Set width
                height: "40px", // Set height
                objectFit: "cover", // Maintain aspect ratio and cover the space
              }}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handleCloseNavMenu(page)}}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* cart badge */}
          <Badge
            badgeContent={4}
            color="warning"
            anchorOrigin={{ vertical: "top", horizontal: "left",  }}
            style={{ marginRight: '1rem', transition: 'transform 0.2s' }}
      sx={{
        '&:hover': {
          transform: 'scale(1.2)', 
          cursor : 'pointer'
        }
      }}
          >
            <ShoppingCartIcon fontSize="large"  onClick= {()=>{handleCloseNavMenu('cart')}}/>
          </Badge>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>{handleCloseUserMenu(setting)}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
   
    </>
    
  );
}
export default Navbar;
