import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  FormHelperText,
  useTheme,
  LinearProgress,
  Stack,
  Checkbox,
  Autocomplete
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';

const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const PrescriptionEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();


  const [rows, setRows] = useState([
    {
      id: 1,
      testgroup: "",
      name: "",
      sortorder: "",
    },
  ]);

  const columns = [

    {
      field: "name",
      headerName: "",
      width: "125",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <Checkbox />,
    },

  ];


  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
            width: '300px',
            height: '40px',
            padding: '8px',
          }}

        >
          <Autocomplete
            freeSolo
            options={["Option 1", "Option 2", "Option 3"]}
            renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
            sx={{ width: 150 }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GridToolbarQuickFilter />
        </Box>
      </GridToolbarContainer>
    );
  }


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
        Prescription
      </Typography>

      <Formik
        initialValues={{
       
        }}
        onSubmit={(values) => { }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2}>
              <Stack sx={{ flex: 1 }} direction="column" spacing={2}>
                <Stack direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="patientName"
                    name="patientName"
                    size="small"
                    label="Patient Name"
                  />
                </Stack>

                <Stack direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    id="email"
                    name="email"
                    label="Email"
                  />
                </Stack>

                {/* Phone Number */}
                <Stack direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                  />
                </Stack>
              </Stack>

              <Stack sx={{ flex: 1 }} direction="column" spacing={2}>
                <Stack direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="doctorname"
                    name="doctorname"
                    size="small"
                    label="Doctor Name"
                  />
                </Stack>

                <Stack direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    id="date"
                    name="date"
                    type="date"
                  />
                </Stack>
                <Stack direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    id="comments"
                    name="comments"
                    label="Comments"
                  />
                </Stack>
              </Stack>
            </Stack>

            <Box mt={2}>
              <Grid container justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => navigate("")}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                width: '65%',
                height: '300px',
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.info.main,
                  color: theme.palette.info.contrastText,
                  fontWeight: "bold",
                  fontSize: theme.typography.subtitle2.fontSize,
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.info.light,
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: theme.palette.info.main,
                  color: theme.palette.info.contrastText,
                },
                "& .MuiCheckbox-root": {
                  color: `${theme.palette.primary.main} !important`,
                },
              }}
            >
              <DataGrid
                slots={{
                  loadingOverlay: LinearProgress,
                  toolbar: CustomToolbar,
                }}
                rows={rows}
                columns={columns}
                getRowId={(row) => row.testgroup}
                initialState={{
                  pagination: { paginationModel: { pageSize: 20 } },
                }}
                pageSizeOptions={[5, 10, 20, 25]}
                columnVisibilityModel={{
                  RecordId: false,
                }}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableSelectionOnClick
                disableRowSelectionOnClick
              />
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default PrescriptionEdit;
