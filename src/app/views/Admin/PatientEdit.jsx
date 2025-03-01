import React, { useEffect } from "react";
import { Grid, Typography, TextField, Button, Box, FormHelperText } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "app/redux/slice/getSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostPatient, PutPatient } from "app/redux/slice/postSlice";
import toast from "react-hot-toast";

// ********************* STYLED COMPONENTS ********************* //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const PatientEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;

  const data = useSelector((state) => state.getSlice.getPatientData);
  
  useEffect(() => {
    dispatch(getPatient({ id: state.RecordId }));
  }, [dispatch, state.RecordId]);

  // if (!data) return <div>Loading...</div>;

  // Formik validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    dob: Yup.date().max(new Date(), "Date of birth cannot be in the future").required("Date of birth is required"),
    doj: Yup.date().max(new Date(), "Date of joining cannot be in the future").required("Date of joining is required"),
  });

  
  // const savePatientData = async (values) => {
  //   const patientdata = {
  //     RecordId: data.RecordId,
  //     FirstName: values.firstName,
  //     LastName: values.lastName,
  //     Email: values.email,
  //     Phone: values.phoneNumber,
  //     AlternatePhone: values.alternatePhone,
  //     DateOfBirth: values.dateofbirth,
  //     DateOfJoining: values.dateofjoining,
  //   }
  //   console.log(patientdata)
  // }
  const savePatientData = async (values) => {
    const patientData = {
      FirstName: values.firstName,
      LastName: values.lastName,
      EmailId: values.email,
      PhoneNumber: values.phoneNumber,
      AlternatePhone: values.alternatePhone,
      DateOfBirth: values.dateofbirth,
      DateOfJoining: values.dateofjoining,
    }
    console.log(patientData)
    if (state.RecordId === 0) {
      const response = await dispatch(PostPatient({ patientData }))
      if (response.payload.status === "Y") {
        toast.success(response.payload.message)

      } else {
        toast.error(response.payload.message)
      }
    } else {
      const response = await dispatch(PutPatient({ Id: state.RecordId, patientData }))
      console.log(response, '==========================================UPDATE--RESPONSE');
      if (response.payload.status === "Y") {
        toast.success(response.payload.message)

      } else {
        toast.error(response.payload.message)
      }
    }
  }
  return (
     <Container>
          <Typography
            variant="h5"
            sx={{
              fontSize: "2rem",
              textAlign: "left",
              fontWeight: "bold",
              marginBottom: 3,
            }}
          >
            Patient Form
          </Typography>
    <Formik
    initialValues={{
      firstName: data?.FirstName || "",
      lastName: data?.LastName || "",
      email: data?.Email|| "",
      phoneNumber: data?.Phone || "",
      alternatePhone: data?.AlternatePhone || "",
      dateofbirth: data?.DateOfBirth || "",
      dateofjoining: data?.DateOfJoining || "",
    }}

    onSubmit={(values) => {
      console.log("Form Values:", values);
      savePatientData(values)
    }}
  >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>First Name:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="standard"
              id="firstName"
              name="firstName"
              size="small"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
  
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Last Name:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="standard"
              size="small"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
  
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Email ID:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="standard"
              size="small"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Grid>
  
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Phone Number:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="standard"
              size="small"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phoneNumber && !!errors.phoneNumber}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Grid>
  
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Alternate Phone:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="standard"
              size="small"
              id="alternatePhone"
              name="alternatePhone"
              value={values.alternatePhone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
  
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Date of Birth:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              name="dateofbirth"
              id="dateofbirth"
              variant="standard"
              size="small"
              type="date"
              value={values.dateofbirth ? new Date(values.dateofbirth).toISOString().split("T")[0] : ""} 
              error={touched.dateofbirth && Boolean(errors.dateofbirth)}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.dateofbirth && errors.dateofbirth}
            />
          </Grid>
  
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Date of Joining:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              name="dateofjoining"
              id="dateofjoining"
              variant="standard"
              size="small"
              type="date"
              value={values.dateofjoining ? new Date(values.dateofjoining).toISOString().split("T")[0] : ""} 
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.dateofjoining && errors.dateofjoining}
            />
          </Grid>
        </Grid>
  
        <Box mt={2}>
          <Grid container justifyContent="flex-end" spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => navigate("/admin/patient")}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    )}
  </Formik>
      </Container>

  
  );
};

export default PatientEdit;
