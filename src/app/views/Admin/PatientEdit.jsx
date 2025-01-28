import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Box,FormHelperText  } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// ********************** STYLED COMPONENTS ********************** //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const PatientEdit = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!emailRegex.test(value));
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    setPhoneError(!phoneRegex.test(value));
  };

  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState(false);

  const handleDobChange = (event) => {
    const value = event.target.value;
    setDob(value);
    const currentDate = new Date().toISOString().split("T")[0];
    setDobError(value && value > currentDate);
  };

  const [doj, setDoj] = useState("");
  const [dojError, setDojError] = useState(false);

  const handleDojChange = (event) => {
    const value = event.target.value;
    setDoj(value);
    const currentDate = new Date().toISOString().split("T")[0];
    setDojError(value && value > currentDate);
  };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({ firstName: '', lastName: '' });
  

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (emailError || phoneError || dobError || dojError) {
      return; 
    }

    let newErrors = { firstName: '', lastName: '' };

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';

    setErrors(newErrors);

    if (!newErrors.firstName && !newErrors.lastName) {
    }

    const formData = {
      email,
      phoneNumber,
      dob,
      doj,
    };

    console.log("Form data submitted: ", formData);

    navigate("/admin/patient");
  };

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

      <form>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontWeight: 'bold' }}>First Name:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            variant="outlined"
            required
            size="small"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ textAlign: 'left' }}
            error={!!errors.firstName}
          />
          {errors.firstName && (
            <FormHelperText error>{errors.firstName}</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontWeight: 'bold' }}>Last Name:</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            variant="outlined"
            required
            size="small"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ textAlign: 'left' }}
            error={!!errors.lastName}
          />
          {errors.lastName && (
            <FormHelperText error>{errors.lastName}</FormHelperText>
          )}
        </Grid>


          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Email ID:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Email ID"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={
                emailError ? "Please enter a valid email address." : ""
              }
              sx={{ textAlign: "left" }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Phone Number:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              error={phoneError}
              helperText={
                phoneError ? "Please enter a valid 10-digit phone number." : ""
              }
              sx={{ textAlign: "left" }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Alternate Phone:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Alternate Phone"
              sx={{ textAlign: "left" }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Date of Birth:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="date"
              value={dob}
              onChange={handleDobChange}
              error={dobError}
              helperText={dobError ? "Date of birth cannot be in the future." : ""}
              sx={{ textAlign: "left" }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Date of Joining:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="date"
              value={doj}
              onChange={handleDojChange}
              error={dojError}
              helperText={dojError ? "Invalid date format." : ""}
              sx={{ textAlign: "left" }}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Grid container justifyContent="flex-end" spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/admin/patient")}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default PatientEdit;

