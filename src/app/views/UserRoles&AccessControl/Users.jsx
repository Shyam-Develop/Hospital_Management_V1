import React from "react";
import { Grid, Typography, TextField, Button, Box, Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";

// ********************* STYLED COMPONENTS ********************* //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const UserEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;
  console.log(state, "state");

  const navigate = useNavigate();

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
        Users Form
      </Typography>

      <Formik
        initialValues={{
          name: "",
          userPortal: "",
          password: "",
          confirmPassword: "",
          email: "",
        }}
        onSubmit={(values) => {
          // Handle form submission logic here
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Name:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="name"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>User Portal:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="userPortal"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Password:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="password"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Confirm Password:</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Field
                  name="confirmPassword"
                  as={TextField}
                  fullWidth
                  variant="standard"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                />
              </Grid>

              {/* Add the new MODULES heading below the Email field */}
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "2rem",
                    textAlign: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                    marginTop: 2,
                  }}
                >
                  Modules
                </Typography>
              </Grid>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginLeft: 4 }}>
  {/* First row */}
  <Box sx={{ flexBasis: '26%' }}>
    <FormControlLabel
      control={<Checkbox size="large" />}
      label="Patient"
    />
  </Box>

  <Box sx={{ flexBasis: '26%' }}>
    <FormControlLabel
      control={<Checkbox size="large" />}
      label="Doctor"
    />
  </Box>

  <Box sx={{ flexBasis: '26%' }}>
    <FormControlLabel
      control={<Checkbox size="large" />}
      label="Pharmacy"
    />
  </Box>

  {/* Second row */}
  <Box sx={{ flexBasis: '26%' }}>
    <FormControlLabel
      control={<Checkbox size="large" />}
      label="Admin"
    />
  </Box>

  <Box sx={{ flexBasis: '26%' }}>
    <FormControlLabel
      control={<Checkbox size="large" />}
      label="Bill&Invoice"
    />
  </Box>

  <Box sx={{ flexBasis: '26%' }}>
    <FormControlLabel
      control={<Checkbox size="large" />}
      label="Lab&TestManagement"
    />
  </Box>

  {/* Third row */}
  <Box sx={{ flexBasis: '26%' }}>
    <FormControlLabel
      control={<Checkbox size="large" />}
      label="ElectricHealthRecord"
    />
  </Box>

  <Box sx={{ flexBasis: '26%' }}>
    <FormControlLabel
      control={<Checkbox size="large" />}
      label="UAAM"
    />
  </Box>
</Box>

            </Grid>

            <Box mt={2}>
              <Grid container justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/UAAM/users")}
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

export default UserEdit;
