import React from 'react';
import Box from '@mui/material/Box';

const drawerWidth = 240;

const BoxWrapper = ({ children }) => {

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        paddingLeft:35,
        paddingTop:10,
        // You can customize the width here if needed
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      {children}
    </Box>
  );
};

export default BoxWrapper;
