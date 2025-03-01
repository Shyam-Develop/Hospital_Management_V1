import React, { useEffect } from "react";
import {
  Paper,
  Button,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Grid,
  Typography,
  LinearProgress,
  Autocomplete,
} from "@mui/material";
import { Breadcrumb } from "app/components";

// ****************** ICONS ****************** //
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import { DataGrid } from "@mui/x-data-grid";
import { dataGridHeight, dataGridRowHeight } from "app/utils/constant";
import { useState } from "react";

// ****************** STYLED COMPONENTS ****************** //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
}));

// ****************** Validation Schema ****************** //
const validationSchema = Yup.object({
  code: Yup.string()
    .min(3, "Code must be at least 3 characters")
    .max(15, "Code must be at most 15 characters"),

  sortOrder: Yup.string()
    .min(1, "Sort Order must be at least 1 character")
    .max(15, "Sort Order must be at most 15 characters"),

  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
});

// ****************** Price List Edit SCREEN  ****************** //
const UserRolesList = () => {
  // ****************** HOOKS AND CONSTANTS ****************** //
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const navigate = useNavigate();

  // ****************** LOCAL STATE ****************** //
  const rows = [
    {
      RecordId: 1,
      username: "",
      "patient": false,
      "doctor": false,
      "pharmacy": false,
      "admin": false,
      "bill": false,
      "pharmacymanagement": true,
      "lab": true,
      "electronic": true,
      "userroles": true,
    },
    {
      RecordId: 2,
      username: " ",
      "patient": false,
      "doctor": false,
      "pharmacy": false,
      "admin": false,
      "bill": false,
      "pharmacymanagement": false,
      "lab": true,
      "electronic": false,
      "userroles": true,
    },
    {
      RecordId: 3,
      username: " ",
      "patient": false,
      "doctor": false,
      "pharmacy": false,
      "admin": false,
      "bill": false,
      "pharmacymanagement": true,
      "lab": false,
      "electronic": false,
      "userroles": true,
    },
    {
      RecordId: 4,
      username: "",
      "patient": false,
      "doctor": false,
      "pharmacy": false,
      "admin": false,
      "bill": false,
      "pharmacymanagement": false,
      "lab": true,
      "electronic": true,
      "userroles": true,
    },
  ];

  const [medicineType, setMedicineType] = useState("");
  const [medicineName, setMedicineName] = useState("");
  // Dynamically populate medicine names based on the selected type
  const medicineNames = {
    Tablet: ["Paracetamol", "Aspirin", "Ibuprofen"],
    Syrup: ["Cough Syrup", "Antacid Syrup"],
    Injection: ["Insulin", "Vitamin B12"],
    Capsule: ["Vitamin D", "Omega-3"],
    Liquid: ["Antiseptic Liquid", "Hand Sanitizer"],
  };

  useEffect(() => {
    // Clear the medicineName whenever the medicineType changes
    setMedicineName("");
  }, [medicineType]);
  const columns = [
    {
      headerName: "ID",
      field: "RecordId",
      width: "50",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
        headerName: "UserName",
        field: "username",
        width: "150",
        align: "Left",
        headerAlign: "center",
        hide: false,
      },
      {
        headerName: "Patient",
        field: "patient",
        width: "125",
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          return <Checkbox />;
        },
      },
      {
        headerName: "Doctor",
        field: "doctor",
        width: "125",
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          return <Checkbox />;
        },
      },
      {
        headerName: "Pharmacy",
        field: "pharmacy",
        width: "125",
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          return <Checkbox />;
        },
      },
      {
        headerName: "Admin",
        field: "admin",
        width: "125",
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          return <Checkbox />;
        },
      },
      {
        headerName: "Bill&Invoice",
        field: "bill",
        width: "150",
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          return <Checkbox />;
        },
      },
    
    {
      field: "Pharmacy&Management",
      headerName: "pharmacymanagement",
      width: "170",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <Checkbox />;
      },
    },
    {
      headerName: "Lab&Test",
      field: "lab",
      width: "150",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <Checkbox />;
      },
    },
    {
      headerName: "ElectronicHealthRec",
      field: "electronic",
      width: "170",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <Checkbox />;
      },
    },

    {
      headerName: "UserRoles&AccessControl",
      field: "userroles",
      width: "200",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <Checkbox />;
      },
    },
 
  ];
  // ****************** REDUX STATE ****************** //
  return (
    <Container>
      <Formik
        initialValues={{
          RecordId: "",
          code: "",
          sortOrder: "",
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange,
          isSubmitting,
          values,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Users" }]} />
            </div>

            <Paper sx={{ width: "100%", mb: 2 }}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                  padding: "10px",
                }}
              >
                <Stack sx={{ gridColumn: "span 4" }} direction="column" gap={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          height: dataGridHeight,
                          width: "203%",
                          marginTop: -1,
                          height: 430, // Reduced height for the DataGrid


                          "& .MuiDataGrid-root": {
                            border: "none",
                          },
                          "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                          },
                          "& .name-column--cell": {
                            color: theme.palette.info.contrastText,
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
                          // "& .MuiCheckbox-root": {
                          //   color: `${theme.palette.primary.main} !important`,
                          // },
                          "& .MuiDataGrid-row:hover": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <DataGrid
                          slots={{
                            loadingOverlay: LinearProgress,
                          }}
                          rowHeight={dataGridRowHeight}
                          rows={rows}
                          columns={columns}
                          getRowId={(row) => row.RecordId}
                          initialState={{
                            pagination: { paginationModel: { pageSize: 20 } },
                          }}
                          pageSizeOptions={[5, 10, 20, 25]}
                          columnVisibilityModel={{
                            RecordId: false,
                            DoctorId: false,
                            AppointmentId: false,   
                        }}
                        di
                          disableColumnFilter
                          disableColumnSelector
                          disableDensitySelector
                          slotProps={{
                            toolbar: {
                              showQuickFilter: true,
                            },
                          }}
                          disableSelectionOnClick
                          disableRowSelectionOnClick
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            </Paper>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default UserRolesList;
