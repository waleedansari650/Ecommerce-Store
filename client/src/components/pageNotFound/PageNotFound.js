import React from "react";
import { Typography, Container, Box } from "@mui/material";
const PageNotFound = () => {
  return (
    <>
      <Container>
        <Box sx={{ textAlign: "center", marginTop: "50px" }}>
          <Typography variant="h1" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1">
            The page you are looking for does not exist.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default PageNotFound;
