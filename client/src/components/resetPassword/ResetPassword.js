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
import { resetPassword } from "../../services/authenticateServies";
import PreviewImage from "../../helper/PreviewImage";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const [avatarImage, setAvatarImage] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
       if(values){
        const { password } = values;
        const formData = {password, email}
        let resetPasswordPromise = resetPassword(formData);
        toast.promise(resetPasswordPromise, {
          loading: "Resetting Password...!",
          success: (response) => <b>🦄 {response.data.msg}</b>,
          error : (error) => <b>🦄 {error.error}</b>
        })
        resetPasswordPromise.then(()=>{
          setTimeout(()=>{
            navigate("/signin");
            formik.resetForm();
          },2000);
        }).catch((error)=>{
          console.log(error);
        })
       }
      } catch (error) {
        toast.error("🦄 Signup failed. Please try again later.!");
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
            Enter New Password
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
                  <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Re-enter Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              {...formik.getFieldProps("confirmPassword")}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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

export default ResetPassword;
