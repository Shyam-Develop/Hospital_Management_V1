import React, { useEffect, useState } from "react";
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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  // DataGrid,
  // GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

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
  const location = useLocation();
  const state = location.state;
  console.log(state, "state");



  const data = useSelector((state) => state.getSlice.getPatientData);
    const status= useSelector((state) => state.getSlice.getPatientDataStatus);
   

      const error= useSelector((state) => state.getSlice.getPatientDataError);
     


  useEffect(() => {
    dispatch(getPatient({ id: state.RecordId }));
  }, [dispatch, state.RecordId]);

 
  // const columns = [
  //   {
  //     headerName: "RecordID",
  //     field: "RecordId",
  //     width: "150",
  //     align: "left",
  //     headerAlign: "left",
  //     hide: false,
  //   },
  //   {
  //     headerName: "SlNo",
  //     field: "serielnumber",
  //     width: "100",
  //     align: "left",
  //     headerAlign: "center",
  //     hide: true,
  //   },
  //   {
  //     headerName: "Description",
  //     field: "description",
  //     width: "200",
  //     align: "left",
  //     headerAlign: "center",
  //     hide: false,
  //   },

  //   {
  //     headerName: "Narration",
  //     field: "narration",
  //     width: "200",
  //     align: "left",
  //     headerAlign: "center",
  //     hide: false,
  //   },
  //   {
  //     headerName: "Amount",
  //     field: "amount",
  //     width: "130",
  //     align: "left",
  //     headerAlign: "center",
  //     hide: false,
  //   },


  // ];




  const columns = [
    {
      headerName: "RecordID",
      field: "RecordID",
      width: 150,
      align: "left",
      headerAlign: "left",
      hide: true,
     
    },
    {
      headerName: "SlNo",
      field: "SLNO",
      width: 100,
      align: "left",
      headerAlign: "center",
      hide: true,
      editable: true,
    },
    {
      headerName: "Description",
      field: "description",
      width: 200,
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: true,
    },
    {
      headerName: "Narration",
      field: "narration",
      width: 200,
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: true,
    },
    {
      headerName: "Amount",
      field: "amount",
      width: 130,
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: (params) => {
        const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
       
      
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: '#009688'}}
             onClick={handleSave(params.id, params)}
            
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={() =>
              {
                setRowModesModel((prev) => ({ ...prev, [params.id]: { mode: GridRowModes.View } }));
              }
              }
              color="inherit"
            />,
          ];
        
        }
      return [
        <GridActionsCellItem
        icon={<AddIcon style={{ color: '#00563B' }} />}
        label="Add"
        onClick={() => handleInsertInrow(params.id)}
        color="inherit"
      />,
        <GridActionsCellItem
        icon={<EditIcon style={{ color: '#3498db' }} />}
          label="Edit"
          onClick={handleEditClick(params.id,params)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon style={{ color: '#e74c3c' }} />}
          label="Delete"
          onClick={handleDeleteClick(params.id, params, "harddelete")}
          color="inherit"
        />,
       
       
      ];
    }
  
  },
  
  
  ];
  
  const initialRows = [
    {RecordID: "1001", SLNO: "1", description: "Room Payment", narration: "Sample A", amount: "500" },
    {  RecordID: "1002", SLNO: "2", description: "Patient Total stay", narration: "Sample B", amount: "700" },
    {  RecordID: "1003", SLNO: "3", description: "Medical Charges", narration: "Sample C", amount: "900" },
    {  RecordID: "1004", SLNO: "4", description: "Scan Charges", narration: "Sample D", amount: "300" },
  ];
    const [rows, setRows] = React.useState(initialRows);



const [rowModesModel, setRowModesModel] = useState({});

    
  const handleRowModesModelChange = (newRowModesModel) => {
    console.log("---handleRowModesModelChange calling");
    setRowModesModel(newRowModesModel);
 
  };

    const handleInsert = () => {
      console.log("----------Step 1");
    
    
     // Temporary unique ID
         const newId = Math.round(Math.random() * 10000);
      setRows((prevRows) => {
    
        const nextSLNO = prevRows.length > 0 ? Math.max(...prevRows.map((row) => row.SLNO || 0)) + 1 : 1; // Determine next SLNO
    
        const newRow = {
          RecordID: newId, // Temporary ID, replaced after backend save
          SLNO: nextSLNO,
          description:"",
          narration:"",
          amount:0
          
        };
    
        console.log("----step2 setRows initializing Objects");
        console.log("Inserted row:", newRow); // Log the new row to the console
    
        return [...prevRows, newRow]; // Append the new row to the existing rows
      });
      console.log("----step3 setRowModesModel initializing Objects");
      setRowModesModel((prev) => ({
        ...prev,
        [newId]: { mode: GridRowModes.Edit },
      }));
    
    
    };
    //=====================================================HANDLESAVE========================================================================//
  const handleSave = (id, params, action) => () => {
    console.log("-----Step1: Local save called");
  
    const rowToSave = params?.row;
    if (!rowToSave) {
      toast.error("Row not found.");
      return;
    }
   const isNew = rowToSave.isNew; // Check if this is a new row
   console.log("Row to save:", rowToSave);
   setRows((prev) =>
      prev.map((row) =>
        row.RecordID === id
          ? { ...row, ...rowToSave, isNew: isNew && action !== "delete", isUpdated: !isNew } // Mark as updated if not new
          : row
      )
      
    );
  
    // Update row mode to view
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  
  };
    const handleEditClick = (id, params) => () => {
      console.log("EditMode");
      
      
      setRowModesModel((prev) => ({
        ...prev,
        [id]: { mode: GridRowModes.Edit },
      }));
    };
  //=====================================================HANDLEDELETE========================================================================//
    const handleDeleteClick = (id) => async () => {
      try {
        // Debugging the value of recID
        
        // First, remove the row from the state
        setRows((prev) => prev.filter((row) => row.RecordID !== id));
        
    
      } catch (error) {
        console.error("Error deleting row:", error);
        toast.error("Error occurred during delete.");
      }
    };
    const processRowUpdate = (newRow, oldRow) => {
      console.log("------inside processRowUpdate");
      console.log(newRow, "--find newRow");
    
      const isNew = !oldRow?.RecordID; // Check if this is a new row
      const updatedRow = { ...newRow, isNew }; // Add `isNew` flag to row data
      console.log(updatedRow, "--find updatedRow before setRows");
    
      // Update the rows state
      setRows((prev) => {
        const index = prev.findIndex((row) => row.RecordID === updatedRow.RecordID);
        if (index !== -1) {
          const newData = [...prev];
          newData[index] = updatedRow; // Update the row in the array
          return newData;
        }
        return [...prev, updatedRow]; // If not found, add a new row
      });
    
      // Save the updated row
      const params = { row: updatedRow };
      handleSave(updatedRow.RecordID, params);
    
      return updatedRow; // Return the updated row to reflect changes in the DataGrid
    };

    const handleInsertInrow = (recordID) => {
     
    
      console.log("----------Step 1");
    
      const newId = Math.round(Math.random() * 10000); // Temporary unique ID
    
      setRows((prevRows) => {
        const index = prevRows.findIndex((row) => row.RecordID === recordID); // ✅ Find the clicked row's index
    
        if (index === -1) return prevRows; // If not found, return unchanged rows
    
        const nextSLNO =
          prevRows.length > 0 ? Math.max(...prevRows.map((row) => row.SLNO || 0)) + 1 : 1;
    
          const newRow = {
            RecordID: newId, // Temporary ID, replaced after backend save
            SLNO: nextSLNO,
            description:"",
            narration:"",
            amount:0
          };
    
        console.log("----step2 setRows initializing Objects");
        console.log("Inserted row:", newRow);
    
        const updatedRows = [...prevRows];
        updatedRows.splice(index + 1, 0, newRow); // ✅ Insert row at the correct position
    
        return updatedRows;
      });
    
      console.log("----step3 setRowModesModel initializing Objects");
      setRowModesModel((prev) => ({
        ...prev,
        [newId]: { mode: GridRowModes.Edit },
      }));
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
   
    <Button
      variant="contained"
      sx={{
        width: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      startIcon={<AddIcon />}
      onClick={handleInsert}
    >
      Add
    </Button>
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
          fontSize: "25px",
          textAlign: "left",
          fontWeight: "bold",
          marginBottom: 3,
        }}
      >
        Billing & Invoice
      </Typography>

      <Formik
        initialValues={{
          firstName: data?.FirstName || "",
          email: data?.Email || "",
          phoneNumber: data?.Phone || "",
        }}
        onSubmit={(values) => {
          console.log("Form Values:", values);
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
                  disabled
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
                  disabled
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
                  disabled
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
                  fontSize: "20px",
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
                    height: '400px',
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
       
        components={{
          Toolbar: CustomToolbar,
        }}
        rows={rows}
        columns={columns}
        rowHeight={30}
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
        onRowModesModelChange={handleRowModesModelChange}
        getRowId={(row) => row.RecordID}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[5, 10, 20, 25]}
        columnVisibilityModel={{
          RecordID: false,
        }}
        processRowUpdate={processRowUpdate}
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //   },
        // }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
                </Box>
              </Stack>

              <Stack sx={{ gridColumn: "span 5" }} direction="column" gap={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -7 ,mt:5}}>
                  <Typography sx={{ fontWeight: "bold", width: '140px' }}>Total Amount:</Typography>

                  <TextField
                    fullWidth
                    name="totalAmount"
                    id="totalAmount"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={values.totalAmount}
                    sx={{ flex: 1 }}
                  />
                </Box>



                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -7 }}>
                  <Typography sx={{ fontWeight: "bold", width: '140px' }}>Additional Charge:</Typography>

                  <TextField
                    fullWidth
                    name="additionCharge"
                    id="additionCharge"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={values.additionCharge}
                    sx={{ flex: 1 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -7 }}>
                  <Typography sx={{ fontWeight: "bold", width: '140px' }}>Additional Discount:</Typography>

                  <TextField
                    fullWidth
                    name="additionDiscount"
                    id="additionDiscount"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={values.additionDiscount}
                    sx={{ flex: 1 }}
                  />
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -7 }}>
                  <Typography sx={{ fontWeight: "bold", width: '140px' }}>Net Amount:</Typography>

                  <TextField
                    fullWidth
                    name="netTotal"
                    id="netTotal"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={values.netTotal}
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
      </>
    ) : (
      false
    )}
    </Container>
  );
};

export default BillingInvoiceEdit;
