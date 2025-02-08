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
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuth from "app/hooks/useAuth";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
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


  const handleNavigation = (path) => {
    navigate(path);
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
              {/* <Typography
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1rem", md: "1.25rem" },
                  textAlign: "center",
                  color: "green",
                  marginTop: 0,
                }}
              >
                Patient Registration Form
              </Typography> */}
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
        <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
     
      gap={2}
    >
      <Box 
        display="flex" 
        alignItems="center" 
        onClick={() => handleNavigation('/session/login')} 
        style={{ cursor: 'pointer' }}
      >
        <IconButton size="large">
          <PersonIcon color="primary" fontSize="large" />
        </IconButton>
        <Typography variant="h5" color="primary" sx={{ ml: 2 }}>
          Patient
        </Typography>
      </Box>

      <Box 
        display="flex" 
        alignItems="center" 
        onClick={() => handleNavigation('/session/doctor')} 
        style={{ cursor: 'pointer' }}
      >
        <IconButton size="large">
          <MedicalServicesIcon color="primary" fontSize="large" />
        </IconButton>
        <Typography variant="h5" color="primary" sx={{ ml: 2 }}>
          Doctor
        </Typography>
      </Box>

      <Box 
        display="flex" 
        alignItems="center" 
        onClick={() => handleNavigation('/session/pharmacy')} 
        style={{ cursor: 'pointer' }}
      >
        <IconButton size="large">
          <LocalPharmacyIcon color="primary" fontSize="large" />
        </IconButton>
        <Typography variant="h5" color="primary" sx={{ ml: 2 }}>
          Pharmacy
        </Typography>
      </Box>

      <Box 
        display="flex" 
        alignItems="center" 
        onClick={() => handleNavigation('/session/admin')} 
        style={{ cursor: 'pointer' }}
      >
        <IconButton size="large">
          <AdminPanelSettingsIcon color="primary" fontSize="large" />
        </IconButton>
        <Typography variant="h5" color="primary" sx={{ ml: 2 }}>
          Admin
        </Typography>
      </Box>
    </Box>
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
