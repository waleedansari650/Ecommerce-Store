import React, { useEffect, useState } from "react";
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
import { useMediaQuery, useTheme, List, ListItem, ListItemText } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/productActions";
import toast from "react-hot-toast";
import { getUser } from "../../services/authenticateServies";

const pages = ["Home", "Products", "Orders", "Delivery"];

function Navbar() {
  const userData = useSelector((state) => state.getproductsdata.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProductCount = useSelector(
    (state) => state.getproductsdata.totalCount
  );
  const userLogin = useSelector((state) => state.getproductsdata.session);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (userLogin) {
      setSettings(["Profile", "Logout"]);
    } else {
      setSettings(["Sign up", "Sign in"]);
    }
  }, [userLogin]);

  useEffect(() => {
    let getUserPromise = dispatch(getUser());
    getUserPromise.catch((error) => {
      if (error.error === "Authentication Failed!") {
        console.error("Authentication failed:", error.error);
        toast.error("Authentication failed. Please login again.");
        setTimeout(() => {
          navigate("/signin");
        });
      } else {
        // Handle other errors
        console.error("Error fetching user:", error);
      }
    });
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    navigate(page === "Home" ? "/" : `/${page}`);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    switch (setting) {
      case "Sign in":
        navigate("/signin");
        break;
      case "Sign up":
        navigate("/signup");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser(false));
    toast.success("Logout Successfuly...!");
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component="a"
              style={{ cursor: "pointer" }}
              sx={{
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                display: "flex",
              }}
            >
     
              <img
              onClick={() => handleCloseNavMenu("Home")}
              
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq-AmpT1wT2ZrZ4Jx_Suv2Sp2NSTiWaX1kYw&usqp=CAU"
                alt="Logo"
                style={{
                  marginRight: 10,
                  marginTop : '10px',
                  borderRadius: "50%", // Rounded corners
                  width: "40px", // Set width
                  height: "40px", // Set height
                  objectFit: "cover", // Maintain aspect ratio and cover the space
                  display: isMobile ? "none" : "inline-block",
                }}
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            </Typography>
            
            <Badge
              badgeContent={cartProductCount || "0"}
              color="warning"
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              style={{ marginRight: "1rem", transition: "transform 0.2s" }}
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                  cursor: "pointer",
                },
              }}
              onClick={() => handleCloseNavMenu("cart")}
            >
              <ShoppingCartIcon fontSize="large" />
            </Badge>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {userLogin ? (
                    <Avatar alt="User Avatar" src={userData.user?.profile} />
                  ) : (
                    <Avatar />
                  )}
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
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            {pages.map((page) => (
              <ListItem     onClick={() => handleCloseNavMenu(page)} key={page}>
                <ListItemText primary={page} />
             
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
