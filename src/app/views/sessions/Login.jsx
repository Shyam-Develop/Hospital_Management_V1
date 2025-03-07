import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, styled, Typography, IconButton, Autocomplete, TextField, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Import icon
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'; // Example icon for management
import ScienceIcon from '@mui/icons-material/Science';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SecurityIcon from '@mui/icons-material/Security';





const StyledRoot = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  backgroundImage: `url(/assets/images/bg.jpg)`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  padding: "0",
}));

const LeftBox = styled("div")(() => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "32px",
  color: "white",
}));

const ContentBox = styled("div")(() => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));

export default function LoginPortal() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roleOptions = [
    { label: "Patient", path: "/session/login", icon: <PersonIcon color="primary" /> },
    { label: "Doctor", path: "/session/doctor", icon: <MedicalServicesIcon color="primary" /> },
    { label: "Pharmacy", path: "/session/pharmacy", icon: <LocalPharmacyIcon color="primary" /> },
    { label: "Admin", path: "/session/admin", icon: <AdminPanelSettingsIcon color="primary" /> },
    {
      label: "Billing and Invoice",
      path: "/session/billing-and-invoice",
      icon: <AttachMoneyIcon color="primary" /> // Use the new icon
    },
    
    { label: "Lab,Xray & Scan", path: "/session/laboratory-and-test-management", icon: <ScienceIcon color="primary" /> },
    {
      label: "Electronic Health Records",
      path: "/session/electronic-health-records",
      icon: <HealthAndSafetyIcon color="primary" />
    },
    {
      label: "User Roles and Access Control",
      path: "/session/user-roles-and-access-control",
      icon: <SecurityIcon color="primary" />
    },
  ];

  const handleLoginNavigation = (role) => {
    if (role && role.path) {
      navigate(role.path);
    }
  };

  return (
    <StyledRoot>
      {/* Left Box */}
      <LeftBox>
        <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center" }}>
          Welcome To <br />
          Hospital Management System
        </Typography>
      </LeftBox>

      <ContentBox sx={{ position: "absolute", top: 16, right: 16, zIndex: 999 }}>
  <Card sx={{ width: 300, padding: "8px", backgroundColor: "rgba(255, 255, 255, 0.7)" }}> {/* Increased width */}
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
      {/* Typography removed, keeping the Box in the same size */}
      <Autocomplete
        options={roleOptions}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          if (newValue) {
            setSelectedRole(newValue);
            handleLoginNavigation(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Login As"
            variant="standard"
            sx={{ color: "black", fontWeight: 400, minHeight: 30 }}
            />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props} display="flex" alignItems="center" gap={1}>
            {option.icon} {/* Ensure option.icon is a valid React component */}
            <Typography variant="body1" color="primary">
              {option.label}
            </Typography>
          </Box>
        )}
        isOptionEqualToValue={(option, value) => option.label === value.label} // Ensure 'option' and 'value' have 'label'
        sx={{ width: "100%" }}
      />
    </Box>
  </Card>
</ContentBox>

    </StyledRoot>
  );
}
