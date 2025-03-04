import React, { useEffect } from "react";
import {
  Grid, Typography, TextField, Button, Box, FormHelperText, useTheme, LinearProgress, Stack

} from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "app/redux/slice/getSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostPatient, PutPatient } from "app/redux/slice/postSlice";
import toast from "react-hot-toast";
import { dataGridHeight, dataGridRowHeight } from "app/utils/constant";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";



// ********************* STYLED COMPONENTS ********************* //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const BillingInvoiceEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();


  // Formik validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    dob: Yup.date().max(new Date(), "Date of birth cannot be in the future").required("Date of birth is required"),
    doj: Yup.date().max(new Date(), "Date of joining cannot be in the future").required("Date of joining is required"),
    description: Yup.string().required("Description is required"),
    narration: Yup.string().required("Narration is required"),
    amount: Yup.number().positive("Amount must be positive").required("Amount is required"),
  });
  const rows = [
    {
      RecordId: "1",
      serielnumber: "",
      description: "",
      narration: "",
      amount: "",


    }
  ]
  const columns = [
    {
      headerName: "RecordID",
      field: "RecordId",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "SlNo",
      field: "serielnumber",
      width: "100",
      align: "left",
      headerAlign: "center",
      hide: true,
    },
    {
      headerName: "Description",
      field: "description",
      width: "200",
      align: "left",
      headerAlign: "center",
      hide: false,
    },

    {
      headerName: "Narration",
      field: "narration",
      width: "200",
      align: "left",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Amount",
      field: "amount",
      width: "130",
      align: "left",
      headerAlign: "center",
      hide: false,
    },


  ];

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
        Billing&Invoice
      </Typography>

      <Formik
        initialValues={{
          serielnumber: "",
          description: "",
          narration: "",
          amount: "",
        }}
        onSubmit={(values) => {
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }} direction="rtl">
              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Patient Name:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  variant="standard"
                  id="firstName"
                  name="firstName"
                  size="small"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>


              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Email ID:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Phone Number:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Date of Birth:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  name="dateofbirth"
                  id="dateofbirth"
                  variant="standard"
                  size="small"
                  type="date"
                  value={values.dateofbirth ? new Date(values.dateofbirth).toISOString().split("T")[0] : ""}
                  error={touched.dateofbirth && Boolean(errors.dateofbirth)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.dateofbirth && errors.dateofbirth}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Date of Joining:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  name="dateofjoining"
                  id="dateofjoining"
                  variant="standard"
                  size="small"
                  type="date"
                  value={values.dateofjoining ? new Date(values.dateofjoining).toISOString().split("T")[0] : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.dateofjoining && errors.dateofjoining}
                />
              </Grid>

            </Grid>

            <Box mt={2}>
              <Grid container justifyContent="flex-end" spacing={1}>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => navigate("/BillingInvoice/bill-invoice")}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Grid item xs={12}>
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
                Line Items
              </Typography>            
                </Grid>
            <Stack direction="row" spacing={2}>
              <Stack sx={{ gridColumn: "span 4" }} direction="column" gap={2}>
                <Box
                  sx={{
                    width: '85%',
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
                    }}
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
              </Stack>

              <Stack sx={{ gridColumn: "span 5" }} direction="column" gap={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -7 }}>
                  <Typography sx={{ fontWeight: "bold", width: '140px' }}>Total Amount:</Typography>

                  <TextField
                    fullWidth
                    name="name"
                    id="name"
                    variant="outlined"
                    size="small"
                    type="text"
                    sx={{ flex: 1 }}
                  />
                </Box>



                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -7 }}>
                  <Typography sx={{ fontWeight: "bold", width: '140px' }}>Additional Charge:</Typography>

                  <TextField
                    fullWidth
                    name="name"
                    id="name"
                    variant="outlined"
                    size="small"
                    type="text"
                    sx={{ flex: 1 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -7 }}>
                  <Typography sx={{ fontWeight: "bold", width: '140px' }}>Additional Discount:</Typography>

                  <TextField
                    fullWidth
                    name="name"
                    id="name"
                    variant="outlined"
                    size="small"
                    type="text"
                    sx={{ flex: 1 }}
                  />
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -7 }}>
                  <Typography sx={{ fontWeight: "bold", width: '140px' }}>Net Amount:</Typography>

                  <TextField
                    fullWidth
                    name="name"
                    id="name"
                    variant="outlined"
                    size="small"
                    type="text"
                    sx={{ flex: 1 }}
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 1, ml: 'auto', size: 'small' }}
                >
                  Pay
                </Button>


              </Stack>
            </Stack>

          </form>
        )}
      </Formik>
    </Container>
  );
};

export default BillingInvoiceEdit;
