import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, styled, Typography, IconButton, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
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
    maxWidth: 200,
    minHeight: 200,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default function Doctor() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <StyledRoot>
      <Box container spacing={2} direction="column">
        <Grid container spacing={40}>
          <Grid item xs={6}>
            <Card className="card" sx={{ height: "100px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <ContentBox>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={() => handleNavigation("/session/login")}
                    style={{ cursor: "pointer" }}
                  >
                    <IconButton size="large">
                      <PersonIcon color="primary" fontSize="large" />
                    </IconButton>
                    <Typography variant="h5" color="primary" sx={{ ml: -1, fontWeight: 1000 }}>
                      Patient
                    </Typography>
                  </Box>
                </Box>
              </ContentBox>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className="card" sx={{ height: "100px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <ContentBox>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={() => handleNavigation("/session/pharmacy")}
                    style={{ cursor: "pointer" }}
                  >
                    <IconButton size="large">
                      <LocalPharmacyIcon color="primary" fontSize="large" />
                    </IconButton>
                    <Typography variant="h5" color="primary" sx={{ ml: -1, fontWeight: 1000 }}>
                      Pharmacy
                    </Typography>
                  </Box>
                </Box>
              </ContentBox>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={40}>
          <Grid item xs={6}>
            <Card className="card" sx={{ height: "100px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <ContentBox>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={() => handleNavigation("/session/doctor")}
                    style={{ cursor: "pointer" }}
                  >
                    <IconButton size="large">
                      <MedicalServicesIcon color="primary" fontSize="large" />
                    </IconButton>
                    <Typography variant="h5" color="primary" sx={{ ml: -1, fontWeight: 1000 }}>
                      Doctor
                    </Typography>
                  </Box>
                </Box>
              </ContentBox>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className="card" sx={{ height: "150px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <ContentBox>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={() => handleNavigation("/session/admin")}
                    style={{ cursor: "pointer" }}
                  >
                    <IconButton size="large">
                      <AdminPanelSettingsIcon color="primary" fontSize="large" />
                    </IconButton>
                    <Typography variant="h5" color="primary" sx={{ ml: -1, fontWeight: 1000 }}>
                      Admin
                    </Typography>
                  </Box>
                </Box>
              </ContentBox>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </StyledRoot>
  );
}
