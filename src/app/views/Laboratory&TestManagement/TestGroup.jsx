import React, { useEffect } from "react";
import {
  LinearProgress,
  Paper,
  Button,
  Box,
  styled,
  useTheme,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { dataGridHeight, dataGridRowHeight } from "app/utils/constant";

// ********************** ICONS ********************** //
import EditIcon from "@mui/icons-material/Edit";
import { Formik } from "formik";

import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorListData } from "app/redux/slice/getSlice";


// ********************** STYLED COMPONENTS ********************** //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

// ********************** ITEMS SCREEN LISTVIEW ********************** //
const TestGroup = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //
  const doctorRows = useSelector((state) => state.getSlice.getDoctorList)
  console.log(doctorRows, '==DoctorRows')
  useEffect
    (() => {
      dispatch(getDoctorListData())
    }, [dispatch])
  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    // {
    //   headerName: "RECID",
    //   field: "RecordId",
    //   width: "150",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: false,
    // },
    // {
    //   headerName: "First Name",
    //   field: "FirstName",
    //   width: "150",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: true,
    // },
    // {
    //   headerName: "Last Name",
    //   field: "LastName",
    //   width: "150",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: false,
    // },
    // {
    //   headerName: "Global ID",
    //   field: "GlobalID",
    //   width: "100",
    //   align: "right",
    //   headerAlign: "left",
    //   hide: false,
    // },
    // {
    //   headerName: "Email",
    //   field: "Email",
    //   width: "170",
    //   align: "left",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "Phone",
    //   field: "PhoneNumber",
    //   width: "170",
    //   align: "right",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "Alternate Phone",
    //   field: "AlternatePhone",
    //   width: "170",
    //   align: "right",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "Qualification",
    //   field: "Qualification",
    //   width: "150",
    //   align: "left",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "Special Qualification",
    //   field: "SpecialQualification",
    //   width: "170",
    //   align: "left",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "DOB",
    //   field: "DateOfBirth",
    //   width: "170",
    //   align: "right",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "DOJ",
    //   field: "DateOfJoining",
    //   width: "170",
    //   align: "right",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   field: "Action",
    //   headerName: "Action",
    //   minWidth: 300,
    //   flex: 1,
    //   sortable: false,
    //   headerAlign: "center",
    //   filterable: false,
    //   disableColumnMenu: true,
    //   disableExport: true,
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div>
    //         <Button
    //           sx={{ height: 25, marginLeft: 1 }}
    //           variant="contained"
    //           color="primary"
    //           size="small"
    //           startIcon={<EditIcon color="action" size="small" />}
    //           onClick={() => {
    //             navigate("/admin/doctor-edit",{state:{RecordId:params.row.RecordId}});
    //           }}
    //         >
    //           Edit
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];



  // ********************** TOOLBAR ********************** //
  // ********************** TOOLBAR ********************** //
  function CustomToolbar() {
    // return (
    //   <GridToolbarContainer
    //     sx={{
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "flex-end", // Align everything to the right
    //       width: "100%",
    //       padding: 0.5,
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "row",
    //         alignItems: "center",
    //         gap: 1,
    //       }}
    //     >
    //       <GridToolbarQuickFilter />
    //       {/* Add Button next to the search box */}
    //       <Button
    //         sx={{ height: 25, marginLeft: 1 }}
    //         variant="contained"
    //         color="primary"
    //         size="small"
    //         startIcon={<AddIcon color="action" size="small" />}
    //         onClick={() => {
    //           navigate("/admin/doctor-edit",{state:{RecordId:0}});
    //         }}
    //       >
    //         Add
    //       </Button>
    //     </Box>
    //   </GridToolbarContainer>
    // );
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
        Test Group
      </Typography>

      <Formik
        initialValues={{
          code: "",
          name: "",
          sortorder: "",

        }}
        onSubmit={(values) => {
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }} direction="rtl">
              {/* First Name */}
              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Code:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  variant="standard"
                  id="code"
                  name="code"
                  size="small"
                  value={values.code}
                  error={touched.code && Boolean(errors.code)}
                  helperText={touched.code && errors.code}

                />
              </Grid>


              {/* Email */}
              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Name:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  id="name"
                  name="name"
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}

                />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: "bold" }}>Sort Order:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  id="sortorder"
                  name="sortorder"
                  value={values.sortorder}
                  error={touched.sortorder && Boolean(errors.sortorder)}
                  helperText={touched.sortorder && errors.sortorder}


                />
              </Grid>

              <Box sx={{ flexBasis: '26%', marginLeft: '17px', marginTop: '15px' }}>
                <FormControlLabel
                  control={<Checkbox size="large" />}
                  label="Disable"
                />
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
                  <Button variant="contained" color="primary" onClick={() => navigate(" ")}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>



          </form>
        )}
      </Formik>

    </Container>
  );
};

export default TestGroup;
