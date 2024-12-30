import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const specializations = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics'];
const doctors = [
  { name: 'Dr. Shyam', specialization: 'Cardiology', fees: 1000 },
  { name: 'Dr. Mahendran', specialization: 'Dermatology', fees: 800 },
  { name: 'Dr. Brown', specialization: 'Neurology', fees: 700 },
  { name: 'Dr. Yogesh', specialization: 'Cardiology', fees: 900 },
];
const times = ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '7.00 PM'];

const AppointmentForm = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [consultancyFees, setConsultancyFees] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
    setSelectedDoctor('');
    setConsultancyFees('');
  };

  const handleDoctorChange = (event) => {
    const doctorName = event.target.value;
    setSelectedDoctor(doctorName);

    const doctor = doctors.find((doc) => doc.name === doctorName);
    setConsultancyFees(doctor ? doctor.fees : '');
  };

  const handleSubmit = () => {
    // Validation: Check if all fields are filled
    if (
      selectedSpecialization &&
      selectedDoctor &&
      selectedDate &&
      selectedTime
    ) {
      alert('Appointed successfully!');
    } else {
      alert('Please fill in all the fields before submitting.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: '5%',
        p: 3,
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h5" sx={{ mb: 5, textAlign: 'center', fontWeight: 'bold', color: 'black' }}>
        Create an Appointment
      </Typography>
      <form>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Typography>Specialization:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              select
              fullWidth
              variant="outlined"
              label="Select Specialization"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
            >
              {specializations.map((specialization) => (
                <MenuItem key={specialization} value={specialization}>
                  {specialization}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography>Doctors:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              select
              fullWidth
              variant="outlined"
              label="Select Doctor"
              value={selectedDoctor}
              onChange={handleDoctorChange}
              disabled={!selectedSpecialization}
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
            <Typography>Consultancy Fees:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              disabled
              value={consultancyFees ? `${consultancyFees} USD` : ''}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography>Appointment Date:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography>Appointment Time:</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              select
              fullWidth
              variant="outlined"
              label="Select Time"
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value)}
            >
              {times.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create new entry
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AppointmentForm;
