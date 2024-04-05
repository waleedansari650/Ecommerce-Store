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
import { EmailOutlined } from "@mui/icons-material"; // Import EmailOutlined icon
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom"; // Import Link as RouterLink
import toast, { Toaster } from "react-hot-toast";
import { loginUser, recoverAccount } from "../../services/authenticateServies";

function ForgotPassword() {
  const [avatarImage, setAvatarImage] = React.useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Email must be a valid Gmail address"
      )
      .required("Enter your account mail"),
  
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (values) {
          let recoverAccountPromise = recoverAccount(values);
          toast.promise(recoverAccountPromise, {
            loading: "Logging in...!",
            success: (response) => <b>🦄 {response.data.message}</b>,
            error: (error)=> <b>{error.error}</b>,
          });
          recoverAccountPromise.then(()=>{
            setTimeout(()=>{
               navigate(`/OTP?email=${values.email}`);
                formik.resetForm();
            }, 2000)
          }).catch((error)=>{
            console.log(error);
          })
        }
      } catch (error) {
        toast.error("🦄 Password Recovery Failed!");
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
            Recovery
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<EmailOutlined />} // Add EmailOutlined icon
              sx={{ mt: 3, mb: 2 }}
            >
              Send Mail
            </Button>
            <Grid container>
              
            <Grid item>
                <RouterLink to="/signup" variant="body2">
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

export default ForgotPassword;
