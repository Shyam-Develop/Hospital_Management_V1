import React from "react";
import {
  Paper,
  Button,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
  Autocomplete,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import logo from "../../../../assets/plylogo.png"
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { dataGridHeight,dataGridHeightC, dataGridRowHeight } from "app/utils/constant";


// ******************** ICONS ******************** //
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import { useState } from "react";
// import AlertDialog from 'app/components/AlertDialog';

// ******************** STYLED COMPONENTS ******************** //
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

// ******************** Validation Schema ******************** //
const validationSchema = Yup.object({
  code: Yup.string()
    .min(3, "Code must be at least 3 characters")
    .max(15, "Code must be at most 15 characters"),

  userName: Yup.string()
    .min(3, "User Name must be at least 3 characters")
    .max(20, "User Name must be at most 20 characters"),

  userGroupName: Yup.string()
    .min(3, "User Group Name must be at least 3 characters")
    .max(50, "User Group Name must be at most 50 characters"),

  sequence: Yup.string()
    .min(1, "Sequence must be at least 1 character")
    .max(15, "Sequence must be at most 15 characters"),
});

// ******************** Price List Edit SCREEN  ******************** //
const UserGroupEdit = () => {
  // ******************** HOOKS AND CONSTANTS ******************** //
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();

  const navigate = useNavigate();
  // ******************** LOCAL STATE ******************** //
  const [openAlert, setOpenAlert] = useState(false);
  const [postError, setPostError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // ******************** REDUX STATE ******************** //

  const type = ["Application User", "Application Admin", "System Admin"];
  // ********************* COLUMN AND ROWS ********************* //
  const columns = [
    {
      headerName: "Company code",
      field: "company_code",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Company Name",
      field: "company_name",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    // {
    //   headerName: "Email",
    //   field: "Email",
    //   width: "300",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: true,
    // },
    // {
    //   headerName: "User Company",
    //   field: "User_Company",
    //   width: "250",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: true,
    // },
  ];

  const rows = [
    {
      recid: 1,
      company_code: "PLY",
      company_name: "Plymouth",
    },
    {
      recid: 2,
      company_code: "S&J",
      company_name: "S and J",
    },
    {
      recid: 3,
      company_code: "NU",
      company_name: "Nicky",
    },
  ];
  const Appcolumns = [
    {
      headerName: "Application Code",
      field: "application_code",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Application Name",
      field: "application_name",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
  ];

  const Approws = [
    {
        application_code: "TK",
      application_name: "Truck",
    },
    {
        application_code: "PP",
      application_name: "Pricing Portal",
    },
    {
        application_code: "CP",
      application_name: "Control Panel",
    },
  ];
  // ********************* Company TOOLBAR ********************* //
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between", // Ensure space between children
          alignItems: "center", // Center-align items vertically
          width: "100%",
        }}
      >
        {/* Left side: Typography */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography fontSize={"14px"} fontWeight={"bold"}>Company Access</Typography>
        </Box>
  
        {/* Right side: Quick Filter */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <GridToolbarQuickFilter />
        </Box>
      </GridToolbarContainer>
    );
  }
    // *********************Application TOOLBAR ********************* //
    function ApplicationCustomToolbar() {
      return (
        <GridToolbarContainer
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between", // Ensure space between children
            alignItems: "center", // Center-align items vertically
            width: "100%",
          }}
        >
          {/* Left side: Typography */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography fontSize={"14px"} fontWeight={"bold"}>Application Access</Typography>
          </Box>
    
          {/* Right side: Quick Filter */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <GridToolbarQuickFilter />
          </Box>
        </GridToolbarContainer>
      );
    }
  //=======================================SAVE================================//

  const HandleSave = async (values) => {
    if (params.mode === "delete") {
      setOpenDialog(true);
    }
  };

  

  // ******************** DELETE ******************** //

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // Close the dialog without deleting
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleDelete = async () => {
    // const ID = Data.RecordId;
    // console.log(ID);

    // const response = await dispatch(deletePrintGroupData({ ID }));
    // if (response.payload.status == "Y") {
    setOpenDialog(false);
    setOpenAlert(true);
    //   dispatch(getPrintGroupListView());
    // } else {
    //   toast.error("Not Delete");
    // }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          recID: "",
          code: "",
          userName: "",
          userGroupName: "",
          sequence: "",
          type: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          HandleSave(values);
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
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="breadcrumb">
              <Breadcrumb
                routeSegments={[
                  { name: "Security" },
                  { name: "User Group", path: "/pages/user-group" },
                  { name: `${params.mode} User Group Detail` },
                ]}
              />
              <Stack direction={"row"} gap={1}>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={
                    params.mode === "delete" ? (
                      <DeleteIcon color="error" size="small" />
                    ) : (
                      <SaveIcon size="small" />
                    )
                  }
                  type="submit"
                  disabled={isSubmitting}
                >
                  {params.mode === "delete" ? "Confirm" : "Save"}
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={<ArrowBackIcon size="small" />}
                  onClick={() => navigate("/pages/user-group")}
                >
                  Back
                </Button>
              </Stack>
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
                <Stack sx={{ gridColumn: "span 2" }} direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="code"
                    name="code"
                    label="Code"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    required
                    disabled={params?.mode === "delete"}
                    value={values.code}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    autoFocus
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="sequence"
                    name="sequence"
                    label="Sequence"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    InputProps={{
                      inputProps: {
                        style: {
                          textAlign: "right",
                        },
                      },
                    }}
                    disabled={params?.mode === "delete"}
                    value={values.sequence}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.sequence && Boolean(errors.sequence)}
                    helperText={touched.sequence && errors.sequence}
                  />
                   <FormControlLabel
                                      control={
                                        <Checkbox
                                          disabled
                                          checked={false}
                                          label="I agree to the terms and conditions"
                                        />
                                      }
                                      label="Disable"
                                    />
                </Stack>

                <Stack sx={{ gridColumn: "span 2" }} direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="userGroupName"
                    name="userGroupName"
                    label="User Group Name"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    disabled={params?.mode === "delete"}
                    value={values.userGroupName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.userGroupName && Boolean(errors.userGroupName)
                    }
                    helperText={touched.userGroupName && errors.userGroupName}
                  />
                  <Autocomplete
                    fullWidth
                    id="type"
                    name="type"
                    options={type}
                    disabled={params?.mode === "delete"}
                    value={values.type}
                    onChange={(event, newValue) =>
                      handleChange({
                        target: { name: "type", value: newValue },
                      })
                    }
                    onBlur={handleBlur}
                    disableClearable
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Type"
                        size="small"
                        error={touched.type && Boolean(errors.type)}
                        helperText={touched.type && errors.type}
                        sx={{ gridColumn: "span 2" }}
                      />
                    )}
                  />
                </Stack>
              </Box>
              <Box
                display="grid"
                gap="10px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                  padding: "10px",
                }}
              >
                <Stack sx={{ gridColumn: "span 2" }} direction="column" gap={1}>
                 
                    <Box
                          sx={{ 

                            height: dataGridHeightC, 
              
                            "& .MuiDataGrid-root": { 
              
                              border: "none", 
              
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
              
                              color: "black !important", 
              
                            }, 
              
                            "& .MuiCheckbox-root.Mui-checked": { 
              
                              color: "black !important", 
              
                            }, 
              
                            "& .MuiDataGrid-row:nth-of-type(even)": { 
              
                              backgroundColor: theme.palette.action.hover, 
              
                            }, 
              
                            "& .MuiDataGrid-row:nth-of-type(odd)": { 
              
                              backgroundColor: theme.palette.background.default, 
              
                            }, 
              
                            "& .MuiDataGrid-row.Mui-selected:hover": { 
              
                              backgroundColor: `${theme.palette.action.selected} !important`, 
              
                            }, 
              
                          }} 
                          >
                            <DataGrid
                              slots={{
                                loadingOverlay: LinearProgress,
                                toolbar: CustomToolbar,
                              }}
                              rowHeight={dataGridRowHeight}
                              rows={rows}
                              columns={columns}
                              checkboxSelection
                              disableSelectionOnClick
                              disableRowSelectionOnClick
                              getRowId={(row) => row.recid}
                              initialState={{
                                pagination: { paginationModel: { pageSize: 20 } },
                              }}
                              pageSizeOptions={[5, 10, 20, 25]}
                              columnVisibilityModel={{
                                recid: true,
                              }}
                              disableColumnFilter
                              disableColumnSelector
                              disableDensitySelector
                              slotProps={{
                                toolbar: {
                                  showQuickFilter: true,
                                },
                              }}
                            />
                          </Box>
                </Stack>

                <Stack sx={{ gridColumn: "span 2" }} direction="column" gap={1}>
               
                   <Box
                         sx={{ 

                          height: dataGridHeightC, 
            
                          "& .MuiDataGrid-root": { 
            
                            border: "none", 
            
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
            
                            color: "black !important", 
            
                          }, 
            
                          "& .MuiCheckbox-root.Mui-checked": { 
            
                            color: "black !important", 
            
                          }, 
            
                          "& .MuiDataGrid-row:nth-of-type(even)": { 
            
                            backgroundColor: theme.palette.action.hover, 
            
                          }, 
            
                          "& .MuiDataGrid-row:nth-of-type(odd)": { 
            
                            backgroundColor: theme.palette.background.default, 
            
                          }, 
            
                          "& .MuiDataGrid-row.Mui-selected:hover": { 
            
                            backgroundColor: `${theme.palette.action.selected} !important`, 
            
                          }, 
            
                        }} 
                        >
                          <DataGrid
                            slots={{
                              loadingOverlay: LinearProgress,
                              toolbar: ApplicationCustomToolbar,
                            }}
                            rowHeight={dataGridRowHeight}
                            rows={Approws}
                            columns={Appcolumns}
                            checkboxSelection
                            disableSelectionOnClick
                            disableRowSelectionOnClick
                            getRowId={(row) => row.application_code}
                            initialState={{
                              pagination: { paginationModel: { pageSize: 20 } },
                            }}
                            pageSizeOptions={[5, 10, 20, 25]}
                            columnVisibilityModel={{
                                application_code: true,
                            }}
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            slotProps={{
                              toolbar: {
                                showQuickFilter: true,
                              },
                            }}
                          />
                        </Box>
                </Stack>
              </Box>
            </Paper>
          </form>
        )}
      </Formik>

      {/* <AlertDialog
        open={openAlert}
        error={postError}
        message={
          params.mode === "add"
            ? "UserGroup added successfully"
            : params.mode === "delete"
              ? "UserGroup Deleted Successfully"
              : "UserGroup updated successfully"
        }
        Actions={
          params.mode === "add" ? (
            <DialogActions>
              <Button
                variant="contained"
                color="info"
                size="small"
                onClick={() => {
                  navigate("/pages/user-group");
                  // dispatch(clearPrintListState());
                }}
              >
                Back to User Group
              </Button>
              <Button
                variant="contained"
                color="info"
                size="small"
                onClick={() => {
                  // dispatch(getPriceListData({ id: 0 }));
                  setOpenAlert(false);
                }}
                autoFocus
              >
                Add New User Group
              </Button>
            </DialogActions>
          ) : (
            <DialogActions>
              <Button
                variant="contained"
                color="info"
                size="small"
                onClick={() => navigate("/pages/user-group")}
              >
                Back to User Group
              </Button>
            </DialogActions>
          )
        }
      /> */}
      <Dialog open={openDialog} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            // maxWidth: 900,
            // minHeight: 400,
          }}
        >
          <img
            src={logo}
            width="150px"
            height="150px"
            alt=""
          />
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            {`Are you sure you want to Delete the Usergroup?`}
          </DialogContent>

          {/* This Box wraps the buttons and ensures they stay at the bottom */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "auto", // Pushes the buttons to the bottom
            }}
          >
            <DialogActions sx={{ width: "100%" }}>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.light, // Custom hover color
                  },
                  color: theme.palette.secondary.contrastText,
                  bgcolor: theme.palette.secondary.light,
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.light, // Custom hover color
                  },
                  color: theme.palette.secondary.contrastText,
                  bgcolor: theme.palette.secondary.light,
                  fontWeight: "bold",
                }}
                type="submit"
                onClick={handleDelete}
              >
                Confirm
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default UserGroupEdit;
