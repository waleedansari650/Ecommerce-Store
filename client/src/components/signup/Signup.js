import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PhotoCamera, Preview, TonalitySharp } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { userRegister } from "../../services/authenticateServies";
import PreviewImage from "../../helper/PreviewImage";
function Signup() {
  const [avatarImage, setAvatarImage] = React.useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(4, "Name must be at least 4 characters long."),
    email: Yup.string()
      .email("Invalid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Email must be a valid Gmail address"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (!avatarImage) {
          toast.error("Please upload an image.");
          return;
        }

        values = { ...values, profile: avatarImage };
        console.log("all values : ", values);
        if (values) {
          let registerPromise = userRegister(values);
          console.log("registerPromise : ", registerPromise);
          toast.promise(registerPromise, {
            loading: "Registering...!",
            success: (response) => <b>🦄 {response.message}!</b>,
            error: (error) => <b>{error.error}</b>,
          });
          registerPromise.then(() => {
            setTimeout(() => {
              navigate("/signin");
              formik.resetForm();
            }, 2000);
          }).catch((error) => {
            console.log(error);
          });
        }
        // navigate('/signin');
      } catch (error) {
        toast.error("🦄 Signup failed. Please try again later.!");
      }
    },
  });
  const handleAvatarChange = async (event) => {
    setAvatarImage(event.target.files[0]);
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster position="top-center" reverseOrder={false} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label htmlFor="avatar-input">
            {avatarImage ? (
              <PreviewImage file={avatarImage} />
            ) : (
              <Avatar
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "secondary.main",
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
            <PhotoCamera />
          </label>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Enter Name"
              name="name"
              autoComplete="name"
              autoFocus
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
