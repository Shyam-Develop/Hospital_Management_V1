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



// ********************* STYLED COMPONENTS ********************* //
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
  const status = useSelector((state) => state.getSlice.getDoctorDataStatus);

  console.log(status, "status");
  const error = useSelector((state) => state.getSlice.getDoctorDataError);
  console.log(data, "==DoctorData");

  useEffect(() => {
    dispatch(getDoctor({ id: state.RecordId }));
  }, []);


  const saveDoctorData = async (values) => {


    const doctorData = {
      FirstName: values.firstName,
      LastName: values.lastName,
      GlobalId: values.globalId,
      EmailId: values.email,
      PhoneNumber: values.phoneNumber,
      AlernatePhone: values.alternatePhone,
      Qualification: values.qualification,
      SpecialQualification: values.specialQualification,
      DateOfBirth: values.dateofbirth,
      DateOfJoining: values.dateofjoining,
      FirstName: values.firstName,
      LastName: values.lastName,
      GlobalId: values.globalId,
      EmailId: values.email,
      PhoneNumber: values.phoneNumber,
      AlernatePhone: values.alternatePhone,
      Qualification: values.qualification,
      SpecialQualification: values.specialQualification,
      DateOfBirth: values.dateofbirth,
      DateOfJoining: values.dateofjoining,
    }
    console.log(doctorData);

    if (state.RecordId === 0) {
      const response = await dispatch(PostDoctor({ doctorData }))
      if (response.payload.status === "Y") {
        toast.success(response.payload.message)

      } else {
        toast.error(response.payload.message)
      }
    } else {
      const response = await dispatch(PutDoctor({ Id: state.RecordId, doctorData }))
      console.log(response, '==========================================UPDATE--RESPONSE');
      if (response.payload.status === "y") {
        toast.success(response.payload.message)

      } else {
        toast.error(response.payload.message)
      }
    }
  }



  //======================================================================================================================//
  const CHARACTER_LIMIT = 100;

  const [numberEmptyError, setNumberEmptyError] = useState(false);
  const [messageEmptyError, setMessageEmptyError] = useState(false);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    message: "",
  });

  const { mobileNumber, message } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length < 1) {
      setNumberEmptyError(true);
      setTimeout(() => setNumberEmptyError(false), 3000);
    } else if (message.length < 1) {
      setMessageEmptyError(true);
      setTimeout(() => setMessageEmptyError(false), 3000);
    } else {

      // Regex expression to remove all characters which are NOT alphanumeric 
      let number = mobileNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");

      // Appending the phone number to the URL
      let url = `https://web.whatsapp.com/send?phone=${number}`;

      // Appending the message to the URL by encoding it
      url += `&text=${encodeURI(message)}&app_absent=0`;

      // Open our newly created URL in a new tab to send the message
      window.open(url);

    }
  };
  return (


    <Container>
    {status === "succeeded" && !error ? (
      <>
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
                  value={
                    values.dateofbirth
                      ? new Date(values.dateofbirth).toISOString().slice(0, 10) // Formats as YYYY-MM-DD
                      : ""
                  }
                  error={touched.dateofbirth && Boolean(errors.dateofbirth)}
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

                  value={
                    values.dateofjoining
                      ? new Date(values.dateofjoining).toISOString().slice(0, 10) // Formats as YYYY-MM-DD
                      : ""
                  }
                  error={touched.dateofjoining && Boolean(errors.dateofjoining)}
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


      <div className="communication">
        <div className="whatsapp-card app">
          {/* Title Section */}
          <div className="title flex_middle">
            <WhatsAppIcon sx={{ marginRight: "0.5em" }} />
            <div>Send Message</div>
          </div>

          {/* Error Messages */}
          {numberEmptyError && <div className="errors">Mobile number cannot be empty!</div>}
          {messageEmptyError && <div className="errors">Message cannot be empty!</div>}
          {!numberEmptyError && !messageEmptyError && <div className="errors-null">.</div>}

          {/* Mobile Number Input */}
          <div className="search_contact app">
            <TextField
              error={numberEmptyError}
              label="Mobile Number"
              placeholder="Mobile Number"
              name="mobileNumber"
              value={mobileNumber}
              onChange={onChange}
              size="small"
              sx={{ margin: "1em 0em", width: "100%" }}
              required
            />
          </div>

          {/* Message Input */}
          <div className="message app" style={{ marginTop: "1.5em" }}>
            <TextField
              multiline
              maxRows={4}
              label="Message"
              placeholder="Hi! Sending a message from React...."
              size="small"
              name="message"
              value={message}
              onChange={onChange}
              required
              error={message.length > CHARACTER_LIMIT || messageEmptyError}
              helperText={
                message.length > CHARACTER_LIMIT
                  ? "Max length exceeded"
                  : `${message.length}/${CHARACTER_LIMIT}`
              }
              sx={{ width: "100%" }}
            />
          </div>

          {/* Send Button */}
          <div style={{ marginTop: "1.5em" }}>
            <Button
              onClick={onSubmit}
              variant="outlined"
              color="success"
              size="small"
              disabled={numberEmptyError || messageEmptyError}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
</>
  ) : (
      false
    )}
    </Container>
  




  );
};

export default DoctorEdit;
// DR_FIRSTNAME = %s, DR_LASTNAME = %s, DR_GLOBALID = %s,
// DR_EMAILID = %s, DR_PHONENUMBER = %s, DR_ALTERNATEPHONE = %s,
// DR_QUALIFICATION = %s, DR_SPECIALQUALIFICATION = %s,
// DR_DATEOFBIRTH = %s, DR_DateOfJoining