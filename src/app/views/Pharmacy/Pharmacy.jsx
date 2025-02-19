import {React,useEffect,useMemo,useState} from "react";
import {
  Paper,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Autocomplete,
  Stack,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";

import {
  GridRowModes,
  // DataGrid,
  // GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
// ******************** ICONS ******************** //
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { FormikCustomAutocompleteSingle, FormikOptimizedAutocomplete } from "app/components/Autyocomplete";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getPharmacyListData, getQueueListData } from "app/redux/slice/getSlice";
import { values } from "lodash";
import { HeaderPost, QueuePost } from "app/redux/slice/postSlice";

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

// ******************** Price List Edit SCREEN  ******************** //
const Pharmacy = () => {
  // ******************** HOOKS AND CONSTANTS ******************** //
  const theme = useTheme();
  const location=useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const navigate = useNavigate();
  const [pageSize, setPageSize] =useState(10);
  const dataGridHeight = 500;
  const dataGridRowHeight = 40;
const dispatch=useDispatch();

//========================================LOCAL-USESTATE=============================//

const [rows, setRows] = useState([]);
const [rowModesModel, setRowModesModel] = useState({});


const [Uom, setUOM] = useState("");
const [cuom, setCuom] = useState("");
const [expiryDate, setExpiryDate] = useState("");
const [mrp, setMrp] = useState("");
const [Gst, setGst] = useState("");
const [Sgst, setSgst] = useState("");
const [Cgst, setCgst] = useState("");
 const[seletcedCategoryID,setseletcedCategoryID]=useState(null);
 const[selectedCustoreID,setselectedCustoreID]=useState(null);

console.log(selectedCustoreID,'===============selectedCustoreID')
 // ******************** REDUX STATE ******************** //
const data=useSelector((state)=>state.getSlice.getQueueList);
console.log(data,'-----getQueueList--')






useEffect(()=>{
 dispatch(getQueueListData({id:selectedCustoreID}));
},[selectedCustoreID])

const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to "YYYY-MM-DD"
  }
  return dateStr;
};

useEffect(() => {
  if (data.Rows) {
    setRows(data.Rows);
  } else {
    setRows([]); // Ensures rows don't break if explorelistViewData is undefined or not an array
  }
}, [data.Rows, location.key]);

  //=============================================================ROWS AND COLUMNS==================================================================================//

  const columns = [
    {
      headerName: 'RecordID',
     field: 'RecordID',
     width: 100,
     align: 'left',
     headerAlign: 'center',
     hide: true,
 },
 {
  headerName: 'ItemRecordID',
 field: 'ItemRecordID',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
{
  headerName: 'UOM',
 field: 'uom',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
{
  headerName: 'CUOM',
 field: 'cuom',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
{
  headerName: 'ExpiryDate',
 field: 'expiryDate',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
{
  headerName: 'MRP',
 field: 'mrp',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
{
  headerName: 'GST',
 field: 'gst',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
{
  headerName: 'SGST',
 field: 'sgst',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
{
  headerName: 'CGST',
 field: 'cgst',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
 {
   headerName: 'SL#',
   field: 'SLNO',
   width: '100',
   align: 'left',
   headerAlign: 'center',
   hide: false,
   maxWidth: 50
 },
    {
      headerName: "Item Number",
      field: "ItemNumber",
      width: 200,
      align: "left",
      headerAlign: "center",
      hide: true,
      editable: false, // Making it editable
    },
    {
      headerName: "Desc",
      field: "Name",
      width: 170,
      align: "left",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Quantity",
      field: "qty",
      width: 170,
      align: "right",
      headerAlign: "center",
      hide: false,
      editable: true,
    },
    {
      headerName: "Price",
      field: "price",
      width: 150,
      align: "right",
      headerAlign: "center",
      hide: false,
      editable: false,
    },
    {
      headerName: "Amount",
      field: "amount",
      width: 150,
      align: "right",
      headerAlign: "center",
      hide: false,
      editable: false,
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
                setUOM("");
                setCuom("");
                setExpiryDate("");
                setMrp("");
                setGst("");
                setSgst("");
                setCgst("")
              }
              }
              color="inherit"
            />,
          ];
        
        }
      return [
      //   <GridActionsCellItem
      //   icon={<AddIcon style={{ color: '#00563B' }} />}
      //   label="Add"
      //   onClick={() => handleInsertInrow(params.id)}
      //   color="inherit"
      // />,
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

  const handleRowSelectio=async(params)=>{

const id=params.ItemRecordID;
console.log(id,'===============RecordID')


const response= await dispatch(getPharmacyListData({id}));
console.log(response,'=========================RESPONSE')
if(response.payload.status === "Y"){
  setUOM(response.payload.data.UOM);
  setCuom(response.payload.data.CUOM);
  setExpiryDate(response.payload.data.ExpiryDate);
  setMrp(response.payload.data.MRP);
  setGst(response.payload.data.GST);
  setSgst(response.payload.data.SGST);
  setCgst(response.payload.data.CGST)
  console.log(expiryDate,'====expiryDate')
}else{
  toast.error("ERROR")
}
  }

    
  
  //=====================================================HANDLEinsert========================================================================//
  const [quantity, setQuantity] = useState(""); // State for quantity

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleInsert = () => {
      console.log("----------Step 1");
    
      if (!tabletsData) {
        console.warn("No item selected in Tablets dropdown.");
        return; // Prevent adding an empty row
      }
    
     // Temporary unique ID
         const newId = Math.round(Math.random() * 10000);
      setRows((prevRows) => {
    
        const nextSLNO = prevRows.length > 0 ? Math.max(...prevRows.map((row) => row.SLNO || 0)) + 1 : 1; // Determine next SLNO
    
        const newRow = {
          RecordID: newId, // Temporary ID, replaced after backend save
          SLNO: nextSLNO,
          ItemRecordID:tabletsData?.RecordID || "",
          ItemNumber: tabletsData?.ItemNumber || "", // Insert selected item number
          Name: tabletsData?.Name || "", // Insert selected item name
          qty: quantity, // Default to 1
          price: tabletsData?.Price || "", // Insert selected price if available
          amount:0, // Calculate amount
          uom:tabletsData?.UOM ||"",
          cuom:tabletsData?.CUOM || "",
          expiryDate:tabletsData?.ExpiryDate || "",
          mrp:tabletsData?.MRP || "",
          gst:tabletsData?.GST || "",
          cgst:tabletsData?.CGST || "",
          sgst:tabletsData?.SGST || "",
          isNew: true,
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
    
      // Clear the selected value after adding
      settabletsData(null);
      setQuantity("");
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
    setUOM("");
    setCuom("");
    setExpiryDate("");
    setMrp("");
    setGst("");
    setSgst("");
    setCgst("")
  };

  //=====================================================HANDLEEDIT========================================================================//
  // const handleEditClick = (id,params) => () => {

  //   // setEditingRowId(id); 
  //   console.log("EditMode");
  //   handleRowSelectio(params.row);
  //   setRowModesModel((prev) => ({
  //     ...prev,
  //     [id]: { mode: GridRowModes.Edit },
  //   }));
  //   // setIsDropdownVisible(true); 
  // };
  const handleEditClick = (id, params) => () => {
    console.log("EditMode");
    
    // Call handleRowSelectio with row data
    handleRowSelectio(params.row);
    
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
  
  const handleRowModesModelChange = (newRowModesModel) => {
    console.log("---handleRowModesModelChange calling");
    setRowModesModel(newRowModesModel);
 
  };
  //==================================================================processRowUpdate=========================================================================//
  const processRowUpdate = (newRow, oldRow) => {
    console.log("------inside processrowupdate");
    console.log(newRow, "--find newRow");
  
    const isNew = !oldRow?.RecordID; // Check if this is a new row
    const updatedRow = { ...newRow, isNew }; // Add `isNew` flag to row data
    
    const amount=Number(updatedRow?.price * updatedRow.qty)

    console.log(amount,'==================amount')
    const totalAmount = Number(amount * updatedRow?.gst)/100;

const NetTotal=Number(amount+totalAmount);
    console.log(totalAmount,'==================totalAmount')
    updatedRow.amount=NetTotal;

   

  
    // Ensure you can see the updated row before setRows is called
    console.log(updatedRow, "--find updatedRow before setRows");
  
    setRows((prev) => {
      const index = prev.findIndex((row) => row.RecordID === updatedRow.RecordID);
      if (index !== -1) {
        const newData = [...prev];
        newData[index] = updatedRow; // Update the row in the array
        return newData;
      }
      return [...prev, updatedRow]; // If not found, add a new row
    });
  
    const params = { row: updatedRow }; // Reassign the updated row to params
    handleSave(updatedRow.RecordID, params); // Call handleSave with updated params
  
    return updatedRow; // Return the updated row to reflect changes in the DataGrid
  };
  
 




  // ********************** TOOLBAR ********************** //\
  const[categoryName,setscategoryName]=useState(null);
  const [tabletsData, settabletsData] = useState(null);
  const handleSelectiontabletsData = (e, newValue) => {
    settabletsData(newValue);
  };
  const handleSelectioncategoryName = (e, newValue) => {
    setscategoryName(newValue);
    setseletcedCategoryID(newValue.RecordID);
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          justifyContent: "space-between", // Distributes elements across the row
          width: "100%",
          padding: 0.5,
        }}
      >
           <FormikCustomAutocompleteSingle
                      sx={{ width:200 }}

                      name="category"
                      id="category"
                      value={categoryName}
                      onChange={handleSelectioncategoryName}
                      label="Category"
                      url={`http://127.0.0.1:5000/api/medical-items`}
                    />
        {/* Autocomplete at the Start */}
        <FormikCustomAutocompleteSingle
          sx={{ width: 300 }}
          name="Tablets"
          id="Tablets"
          value={tabletsData}
          onChange={handleSelectiontabletsData}
          label="Barcode/Enter Material Name - SSDD"
          url={`http://127.0.0.1:5000/api/related-items/${seletcedCategoryID}`}
        />
  
        {/* Quantity TextField in the Center */}
        <TextField
        sx={{ width: 100 }}
        size="small"
        type="number"
        label="Quantity"
        variant="outlined"
        value={quantity} // Controlled value
        onChange={handleQuantityChange} // Handle change
      />
  
        {/* Add Button at the End */}
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
  
  // function CustomToolbar() {
  //   return (
  //     <GridToolbarContainer
  //       sx={{
  //         display: "flex",
  //         justifyContent: "flex-end", // Align everything to the right
  //         width: "100%",
  //         padding: 0.5,
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           display: "flex",
  //           alignItems: "center",
  //           gap: 2, // Space between elements
  //           justifyContent: "flex-end",
  //           width: "100%",
  //         }}
  //       >
  //        <FormikCustomAutocompleteSingle
  //        sx={{width:500}}
  //  name="Tablets"
  //           id="Tablets"
  //           value={tabletsData}
  //           onChange={handleSelectiontabletsData}
  //            label="Barcode/Enter Material Name - SSDD"
  //           url={`http://127.0.0.1:5000/api/related-items/${seletcedCategoryID}`}/>
  //         <Button
  //           variant="contained"
  //           sx={{
  //             width: "100px",
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //           startIcon={<AddIcon />}
  //           onClick={handleInsert}
  //         >
  //           Add
  //         </Button>
  //       </Box>
  //     </GridToolbarContainer>
  //   );
  // }
  const totalAmount = useMemo(() => {
    return rows.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);
  }, [rows]);
const totalGSTAmount = rows.reduce((acc, row) => acc + (Number(row.amount) * Number(row.gst)) / 100, 0).toFixed(2);

  console.log(totalGSTAmount, '============================totalGstAmount');
const HandleSaveQueue = () => {
  const pureArray = Object.values(rows); // Extract only the values (objects)

  console.log(pureArray, '===========PURE ARRAY');

  // If you need to send it as an API payload:
  const data = { Rows: pureArray };
  console.log(data, '============================DATA');
};

const queueDate=new window.Date().toISOString().split('T')[0];
console.log(queueDate)
const HandleQueueSave = async(values) => {
  const idata = rows.map((row) => {
    return {
      Q_RECORDID: row.RecordID,
      // ItemRecordID: row.ItemRecordID,
      Q_UOM: row.uom,
      Q_CUOM: row.cuom,
      Q_EXPIRYDATE: row.expiryDate,
      Q_MRP: row.mrp,
      Q_GST: row.gst,
      Q_CGST: row.cgst,
      Q_SGST: row.sgst,
      Q_ITEMNUMBER: row.ItemNumber,
      Q_DESCRIPTION: row.Name,
      Q_QUANTITY: row.qty,
      Q_AMOUNT: row.amount, 
      Q_PRICE: row.price,
      Q_NETTOTAL: totalAmount, // Ensure this value is passed correctly
      Q_GSTTOTALAMOUNT: totalGSTAmount,
      Q_CUSTOMERNAME: customerName || data.customerName,
      Q_HRECORDID:customerRec || selectedCustoreID,
      Q_DATE: queueDate,
      // Q_ADDITIONALDISCOUNT:"",
      // Q_DISCOUNT:"",
      // Q_SUMMARY:"", // Ensure this value is passed correctly
    };
  });
  console.log(idata, '============================idata');
const response=await dispatch(QueuePost({idata}));
console.log(response, '============================response');

// if(response.type==="QueuePost/POST/fulfilled"){
//   const deleteCustomer=await dispatch(QueueDelete({customer:customer}));
//   console.log(deleteCustomer, '============================deleteCustomer');
// }
};
// var d = new window.Date();
const dateTime=new window.Date().toISOString();
console.log(dateTime,'=========dateTime')
const[customerName,setCustomerName]=useState("");
const[customerRec,setCustomerRec]=useState("");
const HandleSave=async(values)=>{
  const idata={
// H_RECORDID:"",
H_CUSTOMERNAME:values.customer,
H_DATE:values.date,
H_REFERENCE:dateTime,
};
console.log(idata,'----------------------DATA');
const HeaderInsert=await dispatch(HeaderPost({idata}));
console.log(HeaderInsert,'----------------------HeaderInsert');
if(HeaderInsert.payload.status ==="Y"){
  toast.success(HeaderInsert.payload.message);
  setCustomerRec(HeaderInsert.payload.RecordID);
  setCustomerName(HeaderInsert.payload.CustomerName);
}else{
  toast.success(HeaderInsert.payload.error);
}
}

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Pharmacy" }]} />
      </div>
      <Formik
      initialValues={{
        category: "",
    date: data.date,
    customer: data.customerName,
    uom: "",
    cuom: "",
    expiryDate: "",
    mrp: "",
    discount: "",
    additionalDiscount: "",
    roundOff: "",
    netTotal: "",
    gst: "",
    sgst: "",
    cgst: "",
    total: "",
    queue: "",
      }}  
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        HandleSave(values)
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
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
          <Stack
            sx={{
              gridColumn: "span 2",
              width: "80%",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1,
            }}
            direction="column"
            // gap={1}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
           <TextField
                label="Date"
                type="date"
                id="date"
                name="date"
                size="small"
                sx={{ minWidth: 230 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}

              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="customer"
                name="customer"
                size="small"
                label="Customer"
                value={values.customer}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ minWidth: 225 }}
              />
             
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                alignItems: "center",
              }}
            >
               <Button
        variant="outlined"
        sx={{ backgroundColor: "green", color: "black" }}
        type="submit"
      >
        Save
      </Button>
            </Box>
           
          </Stack>

          <Stack sx={{ gridColumn: "span 4" }} direction="column" gap={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    height: dataGridHeight,
                    width: "140%",
                    marginTop: -1,

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
                    rows={rows}
                    columns={columns}
                    // loading={exploreLoading}
                    rowModesModel={rowModesModel}
                    getRowId={(row) => row.RecordID}
                    editMode="row"
                    onRowClick={handleRowSelectio}
                    experimentalFeatures={{ newEditingApi: true }}
                    onRowModesModelChange={handleRowModesModelChange}
                    columnVisibilityModel={{
                      RecordID: false,// Hide RecordID
                      ItemRecordID: false,
                      uom: false,
                      cuom : false,
                      expiryDate: false,
                      mrp: false,
                      gst:false,
                      sgst:false,
                      cgst:false,

                    }}
                    processRowUpdate={processRowUpdate}
                    // onProcessRowUpdateError={handleProcessRowUpdateError}
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                    componentsProps={{
                      toolbar: { setRows, setRowModesModel },
                    }}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                  
                  />
                </Box>
              </Grid>

              <Grid item xs={3.5} sx={{ ml: "auto" }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "56px",
                    textAlign: "left",
                    mb: 1,
                    mt: -3,
                  }}
                >
                  Select Items
                </Typography>
                <Grid container spacing={2}>
  <Grid item xs={12} sm={8}>
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      id="uom"
      name="uom"
      label="UOM"
      type="text"
      value={Uom}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled
    />
  </Grid>

  <Grid item xs={12} sm={8}>
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      id="cuom"
      name="cuom"
      label="C.UOM"
      type="text"
      value={cuom}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
    />
  </Grid>

  <Grid item xs={12} sm={8}>
  <TextField
  fullWidth
  variant="outlined"
  size="small"
  id="expiryDate"
  name="expiryDate"
  label="Expiry Date"
  type="date"
  value={formatDateForInput(expiryDate)}
  onChange={handleChange}
  onBlur={handleBlur}
  InputLabelProps={{ shrink: true }}
  disabled // This makes the field read-only
/>
  </Grid>

  <Grid item xs={12} sm={8}>
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      id="mrp"
      name="mrp"
      label="MRP"
      type="text"
      value={mrp}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled
    />
  </Grid>
</Grid>


                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "56px",
                    textAlign: "left",
                    mb: 1,
                  }}
                >
                  Summary
                </Typography>

                <Grid container spacing={2}>
  <Grid item xs={12} sm={8}>
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      id="discount"
      name="discount"
      label="Discount"
      type="text"
      value={values.discount}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </Grid>

  <Grid item xs={12} sm={8}>
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      id="additionalDiscount"
      name="additionalDiscount"
      label="Additional Discount"
      type="text"
      value={values.additionalDiscount}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </Grid>

  <Grid item xs={12} sm={8}>
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      id="roundOff"
      name="roundOff"
      label="Round Off"
      type="text"
      value={values.roundOff}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </Grid>

  <Grid item xs={12} sm={8}>
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      id="netTotal"
      name="netTotal"
      label="Net Total"
      type="text"
      value={totalAmount}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </Grid>
</Grid>

              </Grid>
            </Grid>
          </Stack>

          <Stack sx={{ gridColumn: "span 5" }} direction="column" gap={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: 1,
                marginTop: -2,
                marginRight: 52,
                marginBottom: 0,
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="gst"
                name="gst"
                size="small"
                label="GST"
                sx={{ minWidth: 118 }}
                InputLabelProps={{
                  style: { fontWeight: "bold" },
                }}
                value={Gst}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="sgst"
                name="sgst"
                size="small"
                label="SGST"
                sx={{ minWidth: 118 }}
                InputLabelProps={{
                  style: { fontWeight: "bold" },
                }}
                value={Sgst}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="cgst"
                name="cgst"
                size="small"
                label="CGST"
                sx={{ minWidth: 118 }}
                InputLabelProps={{
                  style: { fontWeight: "bold" },
                }}
                value={Cgst}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="total"
                name="total"
                size="small"
                label="Total"
                sx={{ minWidth: 118 }}
                InputLabelProps={{
                  style: { fontWeight: "bold" },
                }}
                value={totalGSTAmount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
          </Stack>
          <Stack sx={{ gridColumn: "span 5" }} direction="column" gap={2}>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
  
    }}
  >
    {/* Autocomplete aligned to the start */}
    <Box>
    <FormikOptimizedAutocomplete
                      sx={{ width:200 }}

                      name="queue"
                      id="queue"
                      value={values.queue}
                      onChange={(event,newValue)=>{
                        setFieldValue("queue",newValue);
                        setselectedCustoreID(newValue.RecordID);
                      }}
                      label="Queue"
                      url={`http://127.0.0.1:5000/api/hms_header/getallheader`}
                    />
    </Box>

    {/* Buttons aligned to the end */}
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="outlined"
        sx={{ width: "100px", backgroundColor: "#FFEB3B", color: "black" }}
        onClick={() => HandleQueueSave()}
      >
        Queue
      </Button>
      <Button
        variant="outlined"
        sx={{ width: "100px", backgroundColor: "#FFEB3B", color: "black" }}
      >
        Pay now
      </Button>
    </Box>
  </Box>
</Stack>

        </Box>

        
      </Paper>
      </form>
          )}
        </Formik>
  
    </Container>
  );
};

export default Pharmacy;

const autoComplete = [{ ContactName: "NK" }, { ContactName: "Safin" }];

const autoComplete1 = [
  { ContactName: "Tablets" },
  { ContactName: "Syrups" },
  { ContactName: "Medicine" },
  { ContactName: "Stitching Material" },
  { ContactName: "Injection" },
  { ContactName: "Others" },
];
const autoComplete3 = [{ ContactName: "Patient" }];









// "Q_DATE": "2025-02-17",
// "Q_CUSTOMERNAME": "John Doe",
// "Q_ITEMNUMBER": "12345",
// "Q_DESCRIPTION": "Product A",
// "Q_QUANTITY": 2,
// "Q_PRICE": 50,
// "Q_AMOUNT": 100,
// "Q_GST": 5,
// "Q_CGST": 2.5,
// "Q_SGST": 2.5,
// "Q_MRP": 60,
// "Q_UOM": "PCS",
// "Q_CUOM": "BOX",
// "Q_GSTTOTAL": 10,
// "Q_EXPIRYDATE": "2026-12-31",
// "Q_NETTOTAL": 110