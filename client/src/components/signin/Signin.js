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
import { PhotoCamera } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom"; // Import Link as RouterLink
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../../services/authenticateServies";

function Signin() {
  const [avatarImage, setAvatarImage] = React.useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Email must be a valid Gmail address"
      )
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (values) {
          let loginUserPromise = loginUser(values);
          toast.promise(loginUserPromise, {
            loading: "Logging in...!",
            success: "🦄 Login Successfuly ",
            error: "🦄Invalid Credentials...!",
          });
          loginUserPromise
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              setTimeout(() => {
                navigate("/");
                formik.resetForm();
              }, 2000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        toast.error("🦄 Login failed. Please try again later.!", {});
      }
    },
  });
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
          <Typography component="h1" variant="h5">
            Sign In
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <RouterLink to="/forgot-password" variant="body2"> {/* Use RouterLink */}
                  Forgot password?
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/signup" variant="body2"> {/* Use RouterLink */}
                  Don't have an account? Sign Up
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signin;
