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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { getPatient } from "app/redux/slice/getSlice";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { dataGridRowHeight } from "app/utils/constant";

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
  const location = useLocation();
  const state = location.state;
  const data = useSelector((state) => state.getSlice.getPatientData);
  const status = useSelector((state) => state.getSlice.getPatientDataStatus);


  const error = useSelector((state) => state.getSlice.getPatientDataError);



  useEffect(() => {
    dispatch(getPatient({ id: state.RecordId }));
  }, [dispatch, state.RecordId]);





  const [selectedRows, setSelectedRows] = useState([]);


  const handleRowSelection = (selection) => {
    setSelectedRows(selection); // Store selected row IDs
  };

  const handleAdd = () => {
    console.log("Selected Rows:", selectedRows); // Do something with selected rows
  };

  const columns = [

    {
      field: "RecordID",
      headerName: "RecordID",
      width: "50",
      hide: true
    },
    {
      field: "testName",
      headerName: "Test Name",
      width: "250",
      align: "left",
      headerAlign: "center",
      // renderCell: (params) => <Checkbox />,
    },

  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredTests, setFilteredTests] = useState([]);

  const handleCategoryChange = (event, value) => {
    setSelectedCategory(value);
    setFilteredTests(testList[value] || []);
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          alignItems: "center", // Align items vertically
          flexWrap: "nowrap", // Ensure single row layout
          width: "100%",
          padding: 0.5,
          gap: 2,
        }}
      >
        {/* Left side: Category and Medical Items selection */}
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>

          <Autocomplete
            sx={{ minWidth: 230 }}
            size="small"
            options={testCategories}
            value={selectedCategory}
            renderInput={(params) => <TextField {...params} label="Select Test Category" />}
            onChange={handleCategoryChange}
          />

          {/* <Autocomplete
                 sx={{ minWidth: 230 }}
                 size="small"
                 options={categories}
                 getOptionLabel={(option) => option.name}
                 value={selectedCategory}
                 onChange={(event, newValue) => {
                   setSelectedCategory(newValue);
                   setseletcedCategoryID(newValue ? newValue.RecordID : null);
                 }}
                 renderInput={(params) => <TextField {...params} label="Select Category" />}
            //    disabled={!buttonEnable}
               /> */}
          <GridToolbarQuickFilter />

        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      {status === "succeeded" && !error ? (
        <>
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
              firstName: data.FirstName,
              email: data.Email,
              phoneNumber: data.Phone,
              description: "",
              date: data.DateOfJoining,
              comments: data.Comments,
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
                        id="firstName"
                        name="firstName"
                        size="small"
                        label="Patient Name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Stack>

                    {/* Email */}
                    <Stack direction="column" gap={2}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
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
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phoneNumber && !!errors.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </Stack>
                  </Stack>

                  <Stack sx={{ flex: 1 }} direction="column" spacing={2}>
                    <Stack direction="column" gap={2}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="description"
                        name="description"
                        size="small"
                        label="Doctor Name"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
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
                        label="Date"
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.date && !!errors.date}
                        helperText={touched.date && errors.date}
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
                        value={values.comments}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.comments && !!errors.comments}
                        helperText={touched.comments && errors.comments}
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
                      <Button variant="contained" color="warning" onClick={() => navigate("")}>
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
                    "& .MuiCheckbox-root": {
                      color: `${theme.palette.primary.main} !important`,
                    },
                    "& .MuiDataGrid-row:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <DataGrid
                    slots={{
                      loadingOverlay: LinearProgress,
                      toolbar: CustomToolbar,
                    }}
                    rows={filteredTests}
                    rowHeight={dataGridRowHeight}
                    onRowSelectionModelChange={handleRowSelection}
                    columns={columns}
                    getRowId={(row) => row.RecordID}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 20 } },
                    }}
                    pageSizeOptions={[5, 10, 20, 25]}
                    columnVisibilityModel={{
                      RecordID: false,
                    }}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    disableSelectionOnClick
                    disableRowSelectionOnClick
                    checkboxSelection
                  />
                  <Box mt={2}>
                    <Grid container justifyContent="flex-end" spacing={1}>
                      <Grid item>
                        <Button variant="contained" color="primary" onClick={handleAdd}>
                          Add
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" onClick={() => navigate("")}>
                          Confirm
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </>
      ) : (false)}
    </Container>
  );
};

export default PrescriptionEdit;
const testCategories = ["Blood Test", "Urine Test", "Liver Test"];

const testList = {
  "Blood Test": [
    { RecordID: 1, testName: "Complete Blood Count (CBC)" },
    { RecordID: 2, testName: "Hemoglobin" },
    { RecordID: 3, testName: "Platelet Count" },
    { RecordID: 4, testName: "Red Blood Cell Count" },
    { RecordID: 5, testName: "White Blood Cell Count" },
  ],
  "Urine Test": [
    { RecordID: 6, testName: "Urinalysis" },
    { RecordID: 7, testName: "Urine Culture" },
  ],
  "Liver Test": [
    { RecordID: 8, testName: "ALT (Alanine Aminotransferase)" },
    { RecordID: 9, testName: "AST (Aspartate Aminotransferase)" },
  ],
};