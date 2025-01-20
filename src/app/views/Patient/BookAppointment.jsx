import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from '@mui/system';

// ********************** STYLED COMPONENTS ********************** //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
];
const doctors = [
  { name: "Dr. Shyam", specialization: "Cardiology", fees: 1000 },
  { name: "Dr. Mahendran", specialization: "Dermatology", fees: 800 },
  { name: "Dr. Brown", specialization: "Neurology", fees: 700 },
  { name: "Dr. Yogesh", specialization: "Cardiology", fees: 900 },
];
const times = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "7.00 PM"];

const BookAppointment = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [consultancyFees, setConsultancyFees] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
    setSelectedDoctor("");
    setConsultancyFees("");
  };

  const handleDoctorChange = (event) => {
    const doctorName = event.target.value;
    setSelectedDoctor(doctorName);

    const doctor = doctors.find((doc) => doc.name === doctorName);
    setConsultancyFees(doctor ? doctor.fees : "");
  };

  const handleSubmit = () => {
   
    if (
      selectedSpecialization &&
      selectedDoctor &&
      selectedDate &&
      selectedTime
    ) {
      alert("Appointed successfully!");
    } else {
      alert("Please fill in all the fields before submitting.");
    }
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
        Create an Appointment
      </Typography>

      <form>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>
              Specialization:
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              label="Select Specialization"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
              sx={{ textAlign: "left" }}
            >
              {specializations.map((specialization) => (
                <MenuItem key={specialization} value={specialization}>
                  {specialization}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Doctors:</Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small" 
              label="Select Doctor"
              value={selectedDoctor}
              onChange={handleDoctorChange}
              disabled={!selectedSpecialization}
              sx={{ textAlign: "left" }}
            >
              {doctors
                .filter((doc) => doc.specialization === selectedSpecialization)
                .map((doctor) => (
                  <MenuItem key={doctor.name} value={doctor.name}>
                    {doctor.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>
              Consultancy Fees:
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              disabled
              size="small" 
              value={consultancyFees ? `${consultancyFees} USD` : ""}
              sx={{ textAlign: "left" }} 
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Appointment Date:</Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                renderInput={(params) => (
                  <TextField {...params} size="small" /> 
                )}
              />
            </LocalizationProvider>
          </Grid>

         
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: "bold" }}>Appointment Time:</Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small" 
              label="Select Time"
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
              sx={{ textAlign: "left" }}
            >
              {times.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box mt={2}>
  <Grid container justifyContent="flex-end" spacing={1}>
    <Grid item>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Grid>
    <Grid item>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create new entry
      </Button>
    </Grid>
  </Grid>
</Box>


      </form>
    </Container>
  );
};

export default BookAppointment;
