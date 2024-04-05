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
import { recoverAccount, verifyOTP } from "../../services/authenticateServies";
import { useLocation } from "react-router-dom";
function OTP() {
  const [avatarImage, setAvatarImage] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const validationSchema = Yup.object().shape({
    code: Yup.string().required("OTP is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        values = { ...values, email: email };
        if (values) {
          let verifyOTPPromise = verifyOTP(values);
          toast.promise(verifyOTPPromise, {
            loading: "Verifying OTP...!",
            success: (response) => <b> 🦄 {response.data.msg}</b>,
            error: (error) => <b> {error.error}</b>,
          });
          verifyOTPPromise
            .then(() => {
                setTimeout(() => {
                    navigate(`/resetPassword?email=${email}`);
                    formik.resetForm();
                }, 2000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        toast.error("🦄 Failed to verify OTP");
      }
    },
  });
  const defaultTheme = createTheme();

  const resendOTP = () => {
    if (email) {
          let recoverAccountPromise = recoverAccount({email});
          toast.promise(recoverAccountPromise, {
            loading: "Logging in...!",
            success: (response) => <b>🦄 {response.data.message}</b>,
            error: (error)=> <b>{error.error}</b>,
          });
          recoverAccountPromise.then(()=>{
            setTimeout(()=>{
              
                formik.resetForm();
            }, 2000)
          }).catch((error)=>{
            console.log(error);
          })
        }

  };
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
            Enter OTP
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
              label="Enter OTP"
              name="code"
              autoComplete="email"
              {...formik.getFieldProps("code")}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<EmailOutlined />} // Add EmailOutlined icon
              sx={{ mt: 3, mb: 2 }}
            >
              Verify OTP
            </Button>
            <Grid container>
              <Grid item>
                <div className="text-center py-4 ">
                  <Typography variant="body2">
                    Can't Get OTP?{" "}
                    <Button
                      onClick={resendOTP}
                      variant="text"
                      className="text-red-500"
                    >
                      Resend
                    </Button>
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default OTP;
