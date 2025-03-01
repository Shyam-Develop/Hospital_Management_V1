import React, { useEffect, useState } from "react";
import {
    Paper,
    styled,
    useTheme,
    useMediaQuery,
    Typography, 
    TextField,
     Button,
      Box,
    Autocomplete,
    Stack,
    FormControlLabel,
    Checkbox,
  } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatient, getPayment } from "app/redux/slice/getSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { values } from "lodash";
import { PutHeader } from "app/redux/slice/postSlice";

// ********************** STYLED COMPONENTS ********************** //
const Container = styled("div")(({ theme }) => ({
    margin: "15px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "10px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
    },
  }));

const PharmacyPay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const data = useSelector((state) => state.getSlice.getPaymentData);
  console.log(data,'==========data')
  console.log( state.RecordID,"==== state.RecordId")

  const status= useSelector((state) => state.getSlice.getPaymentDataStatus);
  const error= useSelector((state) => state.getSlice.getPaymentError);
  useEffect(() => {
    dispatch(getPayment({ id: state.RecordID }));
  }, []);

 

  const [showAdditionalField, setShowAdditionalField] = useState(false);
  
  const HandlePay= async(values)=>{

    const hData={
      H_CUSTOMERNAME:values.name,
      H_DATE:data.Date,
      H_REFERENCE:data.Reference,
      H_EMAIL:values.email,
      H_INSURANCE:values.additionalInfo ?"Y":"N",
     H_MODEOFPAYMENT :values.paymentMethod,
     H_REFERENCEANY:values.additionalInfo,
     H_PAIDAMOUNT :values.paymentAmount,
     H_HARDCOPY:values.HardCopy ?"Y":"N",
     H_EMAILSTATUS:values.Emailcheck ?"Y":"N",
     H_WHATSAPPSTATUS:values.Whatsapp ?"Y":"N",
     H_PAIDSTATUS:"Y",
     H_QGSTTOTALAMOUNT:data.QueueGstTotalAmount,
     H_QDISCOUNT:data.QueueDiscount, 
     H_QSUMMARY:data.QueueSummary, 
     H_QADDITIONALDISCOUNT:data.QueueDiscountAmount, 
     H_STATUS:"P", 
     H_QDISCOUNTAMOUNT:data.QueueDiscountAmount,
     H_QNETTOTAL:values.paymentAmount,
     

    }
console.log(hData,'==================dadada');

const response=await dispatch(PutHeader({Id: state.RecordID,hData}));

console.log(response,'===============response')

  }
  
  
  
  
  return (
    <Container>
       {status === "succeeded" && !error ? (
        <>
    <Formik
    initialValues={{
      name:data.CustomerName,
      email:data.Email,
      insurance:data.additionalInfo === "Y" ? true : false,
      paymentMethod:data.ModeOfPayment,
      paymentAmount:data.QueueNetTotal,
      // paymentStatus:data.,
      // paymentDate:data.Date,
      HardCopy:data.HardCopy === "Y" ? true : false,
      Emailcheck:data.Emailcheck === "Y" ? true : false,
      Whatsapp:data.Whatsapp === "Y" ? true : false
    }}
    onSubmit={(values) => {
      console.log("Form Values:", values);
      HandlePay(values);
    }}
  >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit,setFieldValue }) => (
      <form onSubmit={handleSubmit}>
        <Paper sx={{ width: "100%", mb: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: "2rem",
                  textAlign: "left",
                  fontWeight: "bold",
                  marginBottom: 3,
                }}
              >
               Pharmacy Payment
              </Typography>
             
              <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                    padding: "10px",
                  }}
                >
          <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="name"
                        name="name"
                        label="Name"
                        sx={{ gridColumn: "span 2" }}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                       <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="email"
                        name="email"
                        label="Email"
                        sx={{ gridColumn: "span 2" }}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                        <Stack gridColumn="span 2" direction="column" spacing={2}>

<FormControlLabel
control={
<Checkbox
  size="small"
  id="insurance"
  name="insurance"
  checked={values.paidStatus}
  onChange={handleChange}
  sx={{ height: "10px" }}
/>
}
label="Insurance Applicable"
/>



</Stack>
<Stack gridColumn="span 2" direction="column" spacing={2}></Stack>
<Autocomplete
        fullWidth
        size="small"
        options={["Cash", "Gapy", "CreditCard", "DebitCard", "NetBanking"]}
        getOptionLabel={(option) => option}
        value={values.paymentMethod}
        onChange={(event, newValue) => {
setFieldValue("paymentMethod", newValue);
          setShowAdditionalField(newValue !== "Cash"); // Show additional field if not "Cash"
        }}
        onBlur={handleBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            id="paymentMethod"
            name="paymentMethod"
            label="Mode of Payment"
            error={touched.paymentMethod && !!errors.paymentMethod}
            helperText={touched.paymentMethod && errors.paymentMethod}
          />
        )}
      />

      {showAdditionalField && (
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          id="additionalInfo"
          name="additionalInfo"
          label="Reference"
          value={values.additionalInfo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.additionalInfo && !!errors.additionalInfo}
          helperText={touched.additionalInfo && errors.additionalInfo}
          // sx={{ mt: 2 }}
        />
      )}

                       {/* <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="paymentMethod"
                        name="paymentMethod"
                        label="Mode of Payment"
                        value={values.paymentMethod}
                        sx={{ gridColumn: "span 2" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.paymentMethod && !!errors.paymentMethod}
                        helperText={touched.paymentMethod && errors.paymentMethod}
                      /> */}
                       <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="paymentAmount"
                        name="paymentAmount"
                        label="Paid Amount"
                        value={values.paymentAmount}
                        sx={{ gridColumn: "span 2" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.paymentAmount && !!errors.paymentAmount}
                        helperText={touched.paymentAmount && errors.paymentAmount}
                      />

                      <Stack gridColumn="span 2" direction="column" spacing={2}>

                      <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        id="Whatsapp"
                        name="Whatsapp"
                        checked={values.Whatsapp}
                        onChange={handleChange}
                        sx={{ height: "10px" }}
                      />
                    }
                    label="Sent to Whatsapp"
                  />
                   <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        id="Emailcheck"
                        name="Emailcheck"
                        checked={values.Emailcheck}
                        onChange={handleChange}
                        sx={{ height: "10px" }}
                      />
                    }
                    label="Sent to Email"
                  />
                   <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        id="HardCopy"
                        name="HardCopy"
                        checked={values.HardCopy}
                        onChange={handleChange}
                        sx={{ height: "10px" }}
                      />
                    }
                    label="Sent to HardCopy"
                  />



                      </Stack>
                      {/* <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        id="paidStatus"
                        name="paidStatus"
                        checked={values.paidStatus}
                        onChange={handleChange}
                        sx={{ height: "10px" }}
                      />
                    }
                    label="Paid Status"
                  /> */}
                   
{/*       
        <WhatsAppIcon sx={{ 
          backgroundColor: "#25D366", 
          color: "white", 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          padding: "10px 15px",
          "&:hover": { backgroundColor: "#1ebe57" }
        }} /> */}
    
    <Box sx={{ gridColumn: "span 4", display: "flex", justifyContent: "flex-end" }}>
    <Button variant="contained" color="primary" type="submit">
      Confirm
    </Button></Box>
                      </Box>
      </Paper>
      </form>
    )}
  </Formik>
  </>
   ) : (
    false
  )}
      </Container>
  );
};

export default PharmacyPay;


// CustomerName
// : 
// "Rohan G"
// Date
// : 
// "Tue, 25 Feb 2025 00:00:00 GMT"
// Email
// : 
// null
// Emailcheck
// : 
// null
// HardCopy
// : 
// null
// ModeOfPayment
// : 
// null
// PaidAmount
// : 
// null
// PaidStatus
// : 
// null
// QueueAdditionalDiscount
// : 
// 0
// QueueDiscount
// : 
// 0
// QueueDiscountAmount
// : 
// null
// QueueGstTotalAmount
// : 
// 192
// QueueNetTotal
// : 
// 798
// QueueSummary
// : 
// ""
// RecordId
// : 
// 22
// Reference
// : 
// "2025-02-25T10:50:45.108Z"
// Status
// : 
// "P"
// WhatsApp
// : 
// null