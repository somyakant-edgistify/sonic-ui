"use client"; 

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({ color,open, handleClose, message, success }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "middle" }} 
    >
      <MuiAlert 
        onClose={handleClose} 
        severity={success} 
        sx={{ backgroundColor: 'd9d9d9', color: '#000', borderRadius:'10px', width:'25%' }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
