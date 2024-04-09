import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function AnimateSkeleton() {
  return (
    <Box style={{width : "100%",  justifyContent : "center", alignItems : "center", margin : "1rem 0"}}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
