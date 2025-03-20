"use client"; 

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({ color,open, handleClose, message, success }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }} 
    >
      <MuiAlert 
        onClose={handleClose} 
        severity={success} 
        sx={{ backgroundColor: 'white', color: color }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
