import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctor } from "app/redux/slice/getSlice";
import { Formik, Field, Form } from "formik";
import { PostDoctor, PutDoctor } from "app/redux/slice/postSlice";
import toast from "react-hot-toast";
import * as Yup from "yup";  



// ********************** STYLED COMPONENTS ********************** //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

// Validation Schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  globalId: Yup.string().required("Global ID is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  alternatePhone: Yup.string(),
  qualification: Yup.string().required("Qualification is required"),
  specialQualification: Yup.string(),
  // dateofbirth: Yup.date()
  // .required("Date of Birth is required")
  // .test("age", "You must be exactly 24 years old", (value) => {
  //   if (value) {
  //     const today = new Date();
  //     const birthDate = new Date(value);
  //     const age = today.getFullYear() - birthDate.getFullYear();
  //     const m = today.getMonth() - birthDate.getMonth();
  //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //       age--;
  //     }
  //     return age === 50; // Check if age is exactly 24
  //   }
  //   return false;
  // }),

  // dateofjoining: Yup.date()
  //   .required("Date of Joining is required")
  //   .max(new Date(), "Joining date cannot be in the future"),
});


const DoctorEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;
  console.log(state, "state");

  const navigate = useNavigate();

  // Get doctor data from Redux store
  const data = useSelector((state) => state.getSlice.getDoctorData);
  console.log(data, "==DoctorData");

  useEffect(() => {
    dispatch(getDoctor({ id: state.RecordId }));
  }, [dispatch, state.RecordId]);


  const saveDoctorData = async (values) => {


    const doctorData = {
      DR_FIRSTNAME: values.firstName,
      DR_LASTNAME: values.lastName,
      DR_GLOBALID: values.globalId,
      DR_EMAILID: values.email,
      DR_PHONENUMBER: values.phoneNumber,
      DR_ALTERNATEPHONE: values.alternatePhone,
      DR_QUALIFICATION: values.qualification,
      DR_SPECIALQUALIFICATION: values.specialQualification,
      DR_DATEOFBIRTH: values.dateofbirth,
      DR_DateOfJoining: values.dateofjoining,
    }
    console.log(doctorData);
    if(state.RecordId === 0){
    const response = await dispatch(PostDoctor({ doctorData }))
    if (response.payload.status === "Y") {
      toast.success(response.payload.message)

    } else {
      toast.error(response.payload.message)
    }}else{
      const response = await dispatch(PutDoctor({Id:state.RecordId, doctorData }))
      console.log(response,'==========================================UPDATE--RESPONSE');
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
        Doctor Form
      </Typography>

      <Formik
        initialValues={{
          firstName: data.FirstName,
          lastName: data.LastName,
          globalId: data.GlobalID,
          email: data.Email,
          phoneNumber: data.PhoneNumber,
          alternatePhone: data.AlternatePhone,
          qualification: data.Qualification,
          specialQualification: data.SpecialQualification,
          dateofbirth: data.DateOfBirth,
          dateofjoining: data.DateOfJoining,
        }}
        validationSchema={validationSchema} 
        onSubmit={(values) => {
          console.log("Form Values:", values);  // Log all the form values here
          saveDoctorData(values)
        }}
      >
        {({ errors,
          touched,
          handleChange,
          handleBlur,
          values }) => (
          <Form>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>First Name:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="firstName"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>




              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Last Name:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="lastName"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Global ID:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="globalId"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.globalId}
                  error={touched.globalId && Boolean(errors.globalId)}
                  helperText={touched.globalId && errors.globalId}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Email ID:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="email"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Phone Number:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="phoneNumber"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Alternate Phone:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="alternatePhone"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.alternatePhone}
                  error={touched.alternatePhone && Boolean(errors.alternatePhone)}
                  helperText={touched.alternatePhone && errors.alternatePhone}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Qualification:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="qualification"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.qualification}
                  error={touched.qualification && Boolean(errors.qualification)}
                  helperText={touched.qualification && errors.qualification}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Special Qualification:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="specialQualification"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.specialQualification}
                  error={touched.specialQualification && Boolean(errors.specialQualification)}
                  helperText={touched.specialQualification && errors.specialQualification}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Date of Birth:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="dateofbirth"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateofbirth ? new Date(values.dateofbirth).toISOString().split("T")[0] : ""} error={touched.dateofbirth && Boolean(errors.dateofbirth)}
                  helperText={touched.dateofbirth && errors.dateofbirth}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Date of Joining:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="dateofjoining"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateofjoining ? new Date(values.dateofjoining).toISOString().split("T")[0] : ""} error={touched.dateofbirth && Boolean(errors.dateofbirth)}
                  helperText={touched.dateofjoining && errors.dateofjoining}
                />
              </Grid>
            </Grid>

            <Box mt={2}>
              <Grid container justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <Button variant="contained"
                    color="primary"
                    type="submit">


                    Save
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/admin/doctor")}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default DoctorEdit;
// DR_FIRSTNAME = %s, DR_LASTNAME = %s, DR_GLOBALID = %s, 
// DR_EMAILID = %s, DR_PHONENUMBER = %s, DR_ALTERNATEPHONE = %s, 
// DR_QUALIFICATION = %s, DR_SPECIALQUALIFICATION = %s, 
// DR_DATEOFBIRTH = %s, DR_DateOfJoining