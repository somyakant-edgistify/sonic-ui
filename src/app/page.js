"use client";
import styles from "./page.module.css";
import { Box, Typography, Button, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CustomSnackbar from "@/components/Snackbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { registerationAPI } from "@/services/api";
import { Loader } from "@/components/Loader/Loader";


export default function HomePage() {
  const [formDetails, setFormDetails] = useState({ name: '', phone: '', email: '', city: '', company: '' });
  const [successSnackbar, setSuccessSnakbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [colorSet , setColorSet] = useState('');
  const [severity, setSeverity] = useState('');
  const [successful , setSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const WA_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const checkMandatory = useMemo(() => {
    return !formDetails.name || !formDetails.email || !formDetails.phone || !formDetails.company;
  }, [formDetails]);

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });

    if (e.target.name === "email" && !emailRegex.test(e.target.value) && e.target.value !== "") {
      setColorSet("#D32F2F");
      setSnackbarMessage("Invalid email format");
      setSeverity("error");
      setSuccessSnakbar(true);
    } else if (e.target.name === "phone" && (!/^\d{10}$/.test(e.target.value) && e.target.value !== "")) {
      e.target.value.replace(/\D/g, "");
      setColorSet("#D32F2F");
      setSnackbarMessage("Phone number must be 10 digits");
      setSeverity("error");
      setSuccessSnakbar(true);
    } else {
      setSuccessSnakbar(false);
    }
  };
  const handleCloseSnackbar = useCallback(() => {
    setSuccessSnakbar(false);
  },[]);
 

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const num = String(formDetails.phone);
    
    if(num.length === 10 && emailRegex.test(formDetails.email)) {
      setIsLoading(true);

      let params = 
      {
        "name": formDetails.name ,
        "email": formDetails.email,
        "mobileNumber": Number(formDetails.phone),
        "organization": formDetails.company,
        "city":formDetails.city,
      }
      setIsLoading(true);
      const res =  await registerationAPI(params);
  
      if(res.success){
        setTimeout(()=>{
          setIsLoading(false);
          setSuccessful(true);
        },2000);
      }
      else{
        setIsLoading(false);
        setColorSet('#640A02');
        setSnackbarMessage('Something went wrong!');
        setSeverity('error');
        setSuccessSnakbar(true);
      }
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
        {isLoading ? <Loader/>:(!successful ? <Box className={styles.signupBox}>
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
                value={formDetails.phone} 
                onChange={handleChange}
                className={styles.inputField} 
                required
                onKeyDown={(e) => {
                  if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault(); 
                  }
                  if (formDetails.phone.length >= 10 && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}                       
                 />
            </Box>

            <Box className={styles.formContainer}>
              <input 
                placeholder="Email*"
                name="email" 
                value={formDetails.email} 
                onChange={handleChange} 
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
        <Box className={styles.successText}>
          <Typography >
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
    <CustomSnackbar
        color={colorSet}
        open={successSnackbar} 
        handleClose={handleCloseSnackbar} 
        message={snackbarMessage} 
        success={severity}
      />
    </div>
  );
}
