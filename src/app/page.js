"use client";
import styles from "./page.module.css";
import { Box, Typography, Button, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CustomSnackbar from "@/components/Snackbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { registerationAPI } from "@/services/api";
import Image from 'next/image';


export default function HomePage() {
  const [formDetails, setFormDetails] = useState({ name: '', phone: '', email: '', city: '', company: '' });
  const [successSnackbar, setSuccessSnakbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [colorSet , setColorSet] = useState('');
  const [severity, setSeverity] = useState('');
  
  const checkMandatory = useMemo(() => {
    return !formDetails.name || !formDetails.email || !formDetails.phone || !formDetails.company;
  }, [formDetails]);

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };
  const handleCloseSnackbar = useCallback(() => {
    setSuccessSnakbar(false);
  },[]);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Submitted:', formDetails);
    let params = 
      {
        "name": formDetails.name ,
        "email": formDetails.email,
        "mobileNumber": formDetails.phone,
        "organization": formDetails.company
      }
    const res =  await registerationAPI(params);
    console.log(res);
    if(res.success){
      setColorSet('green');
      setSnackbarMessage(res.message);
      setSeverity('success');
      setSuccessSnakbar(true);
    }
    else{
      setColorSet('red');
      setSnackbarMessage('Something went wrong!');
      setSeverity('error');
      setSuccessSnakbar(true);
    }
  
    setFormDetails({ name: '', phone: '', email: '', city: '', company: '' })
  };

  return (
    <>
    <Box className={styles.container}>
      {/* Header */}
      <Image src='/logos/sonic_logo.png' alt="sonic-logo" height={150} width={50} className={styles.logo}/>
      <Typography variant="subtitle1" className={styles.subHeader} sx={{fontSize:{xs:'0.6rem',sm:'0.8rem',md:'1rem', lg:'1.2rem',xl:'1.5rem'}}}>
        Same-day deliveries engineered for fast-growing D2C brands
      </Typography>

      {/* Hero Section */}
      <Typography variant="h3" className={styles.heroText} sx={{fontSize:{xs:'1.5rem', sm:'2.5rem',md:'3rem', lg:'4.5rem'}}} >
        Join brands that know speed isn’t optional - <span className={styles.heroHighlight}>it’s essential!</span>
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      {/* Signup Section */}
      <Box className={styles.signupContainer}>
        <Typography variant="h6" sx={{fontSize:{ xs:'0.8rem',sm:'0.8rem',md:'1rem', lg:'1.2rem' ,xl:'1.5rem', }, fontWeight:400, color:'#C2C2C2'}}>Be first to be fast!</Typography>
        <Typography variant="body2" sx={{fontSize:{xs:'0.5rem',sm:'0.6rem',md:'0.8rem' ,lg:'1rem' ,xl:'1.5rem', }, fontWeight:700, color:'#C2C2C2'}}>Sign up now and get 50% off on shipping for the first 3 months</Typography>

        <Box className={styles.signupBox}>
          <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
            <Box className={styles.formContainer}>
              <input 
                placeholder="Name*"
                name="name" 
                value={formDetails.name} 
                onChange={handleChange} 
                className={styles.inputField}   
                required                         
                 />
              <input 
                placeholder="Phone*"
                name="phone" 
                value={formDetails.phone} 
                onChange={handleChange} 
                className={styles.inputField} 
                required                           
                 />
            </Box>

            <Box className={styles.formContainer}>
            <input 
                placeholder="Email"
                name="email" 
                value={formDetails.email} 
                onChange={handleChange} 
                className={styles.inputField}  
                required                          
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
                placeholder="Company"
                name="company" 
                value={formDetails.company} 
                onChange={handleChange}
                className={styles.inputField} 
                required                           
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

        <Typography variant="body2" className={styles.footerText} sx={{fontSize:{xs:'1.2rem',sm:'1.5rem'}}}>
          From cart to doorstep <span style={{ color: "#E6FF00" }}>in hours</span>
        </Typography>
        <Box className={styles.foot}>
        <Typography variant="caption" className={styles.footerCaption} sx={{fontSize:{xs:'0.4rem',sm:'0.6rem', md:'0.8rem'}}}>
        © 2025 OptiSupply Chain Solution Pvt Ltd<br/> <span>All rights reserved.</span>
        </Typography>
        <Box className={styles.socialLink}>
           <Typography sx={{fontSize:{xs:'0.5rem',sm:'0.6rem',md:'0.8rem',lg:'1rem'}}}>Follow us on</Typography>
           <Link>
           <LinkedInIcon sx={{ color:'white'}}/>
           </Link>
           <Link sx={{ color:'white'}}>
           <WhatsAppIcon/>
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
    </>
  );
}
