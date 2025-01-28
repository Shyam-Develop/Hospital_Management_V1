import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  Grid,
  TextField,
  Box,
  styled,
  useTheme,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuth from "app/hooks/useAuth";

const FlexBox = styled(Box)(() => ({
  display: "flex",
}));

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const StyledRoot = styled("div")(() => ({
  backgroundImage: `url(/assets/images/bg.jpg)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 400,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },

  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem 2rem 1rem 2rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const initialValues = {
  patientname: "",
  phonenumber: "",
  patientdob: "",
  email:"",
};

const validationSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(6, "Password must be 6 character length")
//     .required("Password is required!"),
//   email: Yup.string()
//     .email("Invalid Email address")
//     .required("Email is required!"),
});

export default function Doctor() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate("/home");
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      console.log("Saving data...");
      
      navigate("/session/patient");
    } catch (error) {
      console.error("Error saving data:", error);
      setLoading(false);
    }
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <div className="img-wrapper">
              <img
                src="/assets/images/lo.png"
                width="190px"
                height={"150px"}
                alt=""
              />
              <Typography
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" }, 
                  textAlign: "center",
                  color: "#dd2c00",
                  marginTop: 0,
                }}
              >
                Hospital Management
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1rem", md: "1.25rem" },
                  textAlign: "center",
                  color: "green",
                  marginTop: 0,
                }}
              >
                Patient Registration Form
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="patientname"
                      name="patientname"
                      label="Patient Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.patientname}
                      onChange={handleChange}
                      helperText={touched.patientname && errors.patientname}
                      error={Boolean(errors.patientname && touched.patientname)}
                      sx={{ mb: 1.5 }}
                    />
                       <TextField
                      fullWidth
                      size="small"
                      type="phonenumber"
                      name="phonenumber"
                      label="Phone Number"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.phonenumber}
                      onChange={handleChange}
                      helperText={touched.phonenumber && errors.phonenumber}
                      error={Boolean(errors.phonenumber && touched.phonenumber)}
                      sx={{ mb: 1.5 }}
                    />
                    
                    <TextField
                      fullWidth
                      size="small"
                      name="email"
                      type="email"
                      label="Email ID"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 1.5 }}
                    />

                    {/* <TextField
                      fullWidth
                      size="small"
                      name="patientdob"
                      type="patientdob"
                      label="Patient DOB"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.patientdob}
                      onChange={handleChange}
                      helperText={touched.patientdob && errors.patientdob}
                      error={Boolean(errors.patientdob && touched.patientdob)}
                      sx={{ mb: 1.5 }}
                    /> */}
                    <FlexBox style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent:'space-between' }}>
                      <FlexBox
                        flexDirection="column"
                        gap={2}
                        alignItems="flex-end"
                      >
                       
                        <NavLink
                          to="/session/signin"
                          style={{ color: theme.palette.primary.main }}
                        >
                          Cancel
                        </NavLink>
                      </FlexBox>

                      <FlexBox
                        flexDirection="column"
                        gap={2}
                        alignItems="flex-start"
                      >
                        <NavLink
                          to="/session/patient"
                          style={{ color: theme.palette.primary.main }}
                          onClick={handleSave} 
                        >
                          Save
                        </NavLink>
                      </FlexBox>
                    </FlexBox>

                    {/* <LoadingButton
                      type="submit"
                      sx={{
                        backgroundColor: "#164D50",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#164D50", 
                        },
                        my: 2,
                        width: "100%",
                      }}
                      loading={loading}
                      variant="contained"
                    >
                      Login
                    </LoadingButton> */}
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}
