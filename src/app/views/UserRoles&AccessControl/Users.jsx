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
     
        }}
        onSubmit={(values) => {
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
// DR_FIRSTNAME = %s, DR_LASTNAME = %s, DR_GLOBALID = %s,
// DR_EMAILID = %s, DR_PHONENUMBER = %s, DR_ALTERNATEPHONE = %s,
// DR_QUALIFICATION = %s, DR_SPECIALQUALIFICATION = %s,
// DR_DATEOFBIRTH = %s, DR_DateOfJoining