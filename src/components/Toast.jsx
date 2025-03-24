import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getToastStyle = () => {
  const screenWidth = window.innerWidth;

  let toastStyle = {
    backgroundColor: "#d9d9d9",
    color: "#000",
    fontSize: "16px",
    width: "auto",
    position: "top-right",
    font:'Inter',
  };

  if (screenWidth <= 1280) {
    toastStyle.fontSize = "14px";
    toastStyle.width = "350px";
  } else if (screenWidth <= 1440) {
    toastStyle.fontSize = "16px";
    toastStyle.width = "400px";
  } else if (screenWidth <= 1680) {
    toastStyle.fontSize = "18px";
    toastStyle.width = "450px";
  } else if (screenWidth <= 1920) {
    toastStyle.fontSize = "20px";
    toastStyle.width = "500px";
  } else if (screenWidth <= 2560) {
    toastStyle.fontSize = "50px";
    toastStyle.width = "800px";
    toastStyle.height ="120px"
  } else if (screenWidth <= 3840) {
    toastStyle.fontSize = "60px";
    toastStyle.width = "900px";
    toastStyle.height ="150px"
  } else if (screenWidth <= 4096) {
    toastStyle.fontSize = "70px";
    toastStyle.width = "1050px";
    toastStyle.height ="180px"
  } else if (screenWidth <= 5120) {
    toastStyle.fontSize = "80px";
    toastStyle.width = "1450px";
    toastStyle.height ="180px"
  } else if (screenWidth <= 7640) {
    toastStyle.fontSize = "120px";
    toastStyle.width = "2150px";
    toastStyle.height ="300px";
  }

  return toastStyle;
};

export const showToast = (message, type = "error") => {
  const toastStyle = getToastStyle();

  if (type === "error") {
    toast.error(message, { autoClose: 3000, style: toastStyle });
  } else if (type === "success") {
    toast.success(message, { autoClose: 3000, style: toastStyle });
  } else if (type === "info") {
    toast.info(message, { autoClose: 3000, style: toastStyle });
  } else {
    toast(message, { autoClose: 3000, style: toastStyle });
  }
};

const ToastNotification = () => {
  return <ToastContainer position="top-right" />;
};

export default ToastNotification;
