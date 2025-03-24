"use client";
import styles from "./page.module.css";
import { Box, Typography, Button, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useMemo, useState } from "react";
import { registerationAPI } from "@/services/api";
import { Loader } from "@/components/Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import { showToast } from "@/components/Toast";


export default function HomePage() {
  const [formDetails, setFormDetails] = useState({ name: '', phone: '', email: '', city: '', company: '' });
  const [successful , setSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const WA_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[6789]\d{9}$/;

  const checkMandatory = useMemo(() => {
    return !formDetails.name || !formDetails.email || !formDetails.phone || !formDetails.company;
  }, [formDetails]);

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };
  const showError = (message) => {
    showToast(message, 'error');
  }
  const validateEmail = () => {
    if (!emailRegex.test(formDetails.email)) {
      showError("Invalid email format");
      return false;
    }
    return true;
  };
  
  const validatePhoneNumber = () => {
    if (!phoneRegex.test(formDetails.phone)) {
      showError("Invalid phone number");
      return false;
    }
    return true;
  };


  const handleFormSubmit = async(e) => {
     e.preventDefault();
     
     if(!validateEmail() || !validatePhoneNumber()){
      return;
     }
     let params = 
      {
        "name": formDetails.name ,
        "email": formDetails.email,
        "mobileNumber": Number(formDetails.phone),
        "organization": formDetails.company,
        "city":formDetails.city,
     }
     try {
        setIsLoading(true);
        const res =  await registerationAPI(params);
        setIsLoading(false);
  
        if(res.success){ 
          setSuccessful(true);
        }
        else{
        showError('Something went wrong');
      }     
     } 
     catch (error) {
      setIsLoading(false);
      showError("Submission Failed");
     }

     setFormDetails({ name: '', phone: '', email: '', city: '', company: '' })
  };


  return (
    <div>
    <Box className={styles.container}>
      {/* Header */}
      <div className={styles.imageContainer}>
      <img src='/logos/sonic_logo.png' alt="sonic-logo" className={styles.logo}/>
      </div>
      <Typography variant="subtitle1" className={styles.subHeader} >
        Same-day deliveries engineered for fast-growing D2C brands
      </Typography>

      {/* Hero Section */}
      <Typography variant="h3" className={styles.heroText} sx={{fontSize:{xl:'4rem'}}} >
        Join brands that know speed isn’t optional - <span className={styles.heroHighlight}>it’s essential!</span>
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      {/* Signup Section */}
      <Box className={styles.signupContainer}>
        <Box className={styles.labelContainer}>
        <Typography variant="h6" className={styles.upperLabel} sx={{ fontWeight:400, color:'#C2C2C2'}}>Be first to be fast!</Typography>
        <Typography variant="body2" className={styles.lowerLabel} sx={{ fontWeight:700, color:'#C2C2C2'}}>Sign up now and get 50% off on shipping for the first 3 months</Typography>
        </Box>
        {isLoading ?
          <Loader/>
          :(!successful ? <Box className={styles.signupBox}>
          <form className={styles.formDet} sx={{width :'100%'}} onSubmit={handleFormSubmit}>
            <Box className={styles.formContainer}>
              <input 
                placeholder="Name*"
                name="name" 
                type="text"
                onKeyDown={(e) => {
                  if (!/^[a-zA-Z\s]$/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                  if (formDetails.name.length >= 50 && e.key !== "Backspace") {
                    e.preventDefault(); 
                  }
                }}
                value={formDetails.name} 
                onChange={handleChange} 
                className={styles.inputField}   
                required                      
                 />
              <input 
                placeholder="Phone*"
                name="phone"
                type="text"
                className={styles.inputField}
                value={formDetails.phone} 
                onChange={handleChange}
                onBlur={validatePhoneNumber}
                onKeyDown={(e) => {
                  if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault(); 
                  }
                  if (formDetails.phone.length >= 10 && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }} 
                required                      
                 />
            </Box>

            <Box className={styles.formContainer}>
              <input 
                placeholder="Email*"
                name="email" 
                value={formDetails.email} 
                onChange={handleChange} 
                onBlur={validateEmail}
                className={styles.inputField}  
                required
                type="text"  
                onKeyDown={(e) => {
                  if (formDetails.email.length >= 50 && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}         
              />
                <select name="city" value={formDetails.city|| ''} onChange={handleChange}  
                 className={styles.selectField}>
                  <option value="" disabled hidden>
                    Cities interested in
                  </option>
                  <option key="Mumbai" value="Mumbai">Mumbai</option>
                  <option key="Bangalore" value="Bangalore">Bangalore</option>
                  <option key="Delhi" value="Delhi">Delhi</option>
                  <option key="Chennai" value="Chennai">Others</option>
                </select>
            </Box>

            <Box className={styles.formContainer}>
            <input 
                placeholder="Company*"
                name="company" 
                value={formDetails.company} 
                onChange={handleChange}
                className={styles.inputField} 
                required
                type="text"
                onKeyDown={(e) => {
                  if (formDetails.company.length >= 50 && e.key !== "Backspace") {
                    e.preventDefault(); 
                  }
                }}
                 />
              <Button 
                type="submit"  
                disabled={checkMandatory}  
                className={`${styles.submitButton} ${checkMandatory ? styles.submitButtonDisabled : styles.submitButtonEnabled}`}
                endIcon={<ArrowForwardIcon />}
              >
                Go Sonic!
              </Button>
            </Box>
          </form>
        </Box>
          :
        <Box className={styles.successBox}>
          <Typography className={styles.successText} >
            Thanks for showing interest in Sonic. <br/> We will get back to you within 24 hours.
          </Typography>
        </Box>
        )}

        <Typography variant="body2" className={styles.footerText}>
          From cart to doorstep <span style={{ color: "#E6FF00" }}>in hours</span>
        </Typography>
        <Box className={styles.foot}>
        <Typography variant="caption" className={styles.footerCaption}>
        © 2025 OptiSupply Chain Solution Pvt Ltd<br/> <span>All rights reserved.</span>
        </Typography>
        <Box className={styles.socialLink}>
            <Typography className={styles.followUs} >Follow us on</Typography>
            <Link href="https://www.linkedin.com/company/105163621/admin/dashboard/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon className={styles.socialMedia} sx={{color:'white'}} />
            </Link>
            <Link href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className={styles.socialMedia} sx={{color:'white'}} />
            </Link>
        </Box>
        </Box>
      </Box>
    </Box>
    <ToastContainer position="top-center" />
    </div>
  );
}
