import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="primary" />
    </div>
    )
  );
};

export default Loader;
