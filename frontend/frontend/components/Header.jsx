import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function AppHeader() {
  return (
    <Box position="static" sx={{color: "Black" , backgroundColor : "white",padding : "0px", margin: "0px"}}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '16px 0',
          }}
        >
          Diabetic Retinopathy Detection
        </Typography>
    </Box>
  );
}

export default AppHeader;