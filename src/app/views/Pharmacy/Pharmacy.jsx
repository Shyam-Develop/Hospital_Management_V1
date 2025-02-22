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
import { FormikCustomAutocompleteSingle, FormikCustomAutocompleteTabletsID, FormikOptimizedAutocomplete } from "app/components/Autyocomplete";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getPharmacyListData, getQueueListData } from "app/redux/slice/getSlice";
import { values } from "lodash";
import { HeaderPost, QueuePost } from "app/redux/slice/postSlice";
import { number } from "yup";

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
const [Disc, setDisc] = useState("");
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
  headerName: 'Discount',
 field: 'discount',
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
  headerName: 'GST AMT',
 field: 'gstAmount',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
{
  headerName: 'SGST AMT',
 field: 'sgstAmount',
 width: 100,
 align: 'left',
 headerAlign: 'center',
 hide: true,
},
{
  headerName: 'CGST AMT',
 field: 'cgstAmount',
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
   hide: true,
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
      headerName: "Item",
      field: "Item",
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
      headerName: "DiscountAmount",
      field: "discountAmount",
      width: 150,
      align: "right",
      headerAlign: "center",
      hide: true,
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
                setCgst("");
                setDisc("");
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
  setCgst(response.payload.data.CGST);
  setDisc(response.payload.data.Discount);
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
          ItemRecordID:tabletsData?.item_id || "",
          ItemNumber: tabletsData?.itemNumber || "", // Insert selected item number
          Name: tabletsData?.item_name || "", // Insert selected item name
          Item:`${tabletsData.itemNumber}||${tabletsData.item_name}`,
          qty: quantity, // Default to 1
          price: tabletsData?.price || "", // Insert selected price if available
          amount:0, // Calculate amount
          uom:tabletsData?.uom ||"",
          cuom:tabletsData?.cuom || "",
          expiryDate:tabletsData?.expirydate || "",
          mrp:tabletsData?.mrp || "",
          gst:tabletsData?.gst || "",
          cgst:tabletsData?.cgst || "",
          sgst:tabletsData?.sgst || "",
          discount:tabletsData?.DISCOUNT || "",
          discountAmount:0, 
          gstAmount:0, 
          sgstAmount:0, 
          cgstAmount:0, 
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
    setCgst("");
    setDisc("")
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
//   const processRowUpdate = (newRow, oldRow) => {
//     console.log("------inside processrowupdate");
//     console.log(newRow, "--find newRow");
  
//     const isNew = !oldRow?.RecordID; // Check if this is a new row
//     const updatedRow = { ...newRow, isNew }; // Add `isNew` flag to row data
    

// const priceMount=Number(updatedRow?.price -Number(updatedRow?.price * updatedRow?.discount/100))

// console.log(priceMount,'==================priceMount')



//     const amount=Number(updatedRow?.price * updatedRow.qty)

//     console.log(amount,'==================amount')
// //     const totalAmount = Number(amount * updatedRow?.gst)/100;

// const NetTotal=Number(amount+totalAmount);
//     console.log(totalAmount,'==================totalAmount')
   
//     const TotalDiscount = Number(NetTotal - ((updatedRow?.discount * NetTotal) / 100));

//     console.log(TotalDiscount,'==================TotalDiscount');


 

//     const sgstAmt=Number(amount * updatedRow.sgst/100);
//     const cgstAmt=Number(Number(updatedRow.amount * updatedRow.cgst)/100);

//     console.log(sgstAmt,'=====================sgstAmount');
//     updatedRow.price=priceMount
//     updatedRow.amount=amount;
//     updatedRow.discountAmount=TotalDiscount;
//     updatedRow.sgstAmount=sgstAmt;
//     updatedRow.cgstAmount=sgstAmt;
//     updatedRow.gstAmount=Number(sgstAmt + sgstAmt);
//     // Ensure you can see the updated row before setRows is called
//     console.log(updatedRow, "--find updatedRow before setRows");
  
//     setRows((prev) => {
//       const index = prev.findIndex((row) => row.RecordID === updatedRow.RecordID);
//       if (index !== -1) {
//         const newData = [...prev];
//         newData[index] = updatedRow; // Update the row in the array
//         return newData;
//       }
//       return [...prev, updatedRow]; // If not found, add a new row
//     });
  
//     const params = { row: updatedRow }; // Reassign the updated row to params
//     handleSave(updatedRow.RecordID, params); // Call handleSave with updated params
  
//     return updatedRow; // Return the updated row to reflect changes in the DataGrid
//   };
  
const processRowUpdate = (newRow, oldRow) => {
  console.log("------inside processRowUpdate");
  console.log(newRow, "--find newRow");

  const isNew = !oldRow?.RecordID; // Check if this is a new row
  const updatedRow = { ...newRow, isNew }; // Add `isNew` flag to row data

  // Calculate discounted price
  const priceMount = Number(updatedRow?.price) * (1 - Number(updatedRow?.discount) / 100);
  console.log(priceMount, "================== priceMount");

  // Calculate amount before taxes
  const amount = Number(priceMount * updatedRow.qty);
  console.log(amount, "================== amount");

  // Ensure totalAmount is defined before using it in NetTotal
  const totalAmount = Number(amount * updatedRow?.gst) / 100;
  console.log(totalAmount, "================== totalAmount");

  // Calculate NetTotal (amount + GST)
  const NetTotal = Number(amount + totalAmount);

  // Calculate total discount amount
  const TotalDiscount = Number(NetTotal - (updatedRow?.discount * NetTotal) / 100);
  console.log(TotalDiscount, "================== TotalDiscount");

  // Calculate SGST and CGST amounts
  const sgstAmt = Number((amount * updatedRow.sgst) / 100);
  const cgstAmt = Number((amount * updatedRow.cgst) / 100);
  console.log(sgstAmt, "===================== SGST Amount");
  console.log(cgstAmt, "===================== CGST Amount");

  // Assign calculated values to updatedRow
  updatedRow.price = priceMount;
  updatedRow.amount = amount;
  updatedRow.discountAmount = TotalDiscount;
  updatedRow.sgstAmount = sgstAmt;
  updatedRow.cgstAmount = cgstAmt;
  updatedRow.gstAmount = Number(sgstAmt + cgstAmt); // Fix GST total calculation

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
//==========================================================FILTER-ITEMS============================================================================================//

const items=medicalItems.filter((item)=>item.category_id === seletcedCategoryID)

console.log(items,"==============items")
  // ********************** TOOLBAR ********************** //\
  const[categoryName,setscategoryName]=useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
        <Autocomplete
    sx={{ width: 200 }}
    size="small"
    options={categories}
    getOptionLabel={(option) => option.name}
    value={selectedCategory} // Ensure the selected value is displayed
    onChange={(event, newValue) => {
        setSelectedCategory(newValue);
        setseletcedCategoryID(newValue ? newValue.RecordID : null); // Avoid null errors
    }}
    renderInput={(params) => <TextField {...params} label="Select Category" />}
/>
           {/* <FormikCustomAutocompleteSingle
                      sx={{ width:200 }}

                      name="category"
                      id="category"
                      value={categoryName}
                      onChange={handleSelectioncategoryName}
                      label="Category"
                      url={`http://127.0.0.1:5000/api/medical-items`}
                    /> */}
        {/* Autocomplete at the Start */}
        <Autocomplete
         sx={{ width:200 }}
         size="small"
      options={items}
      value={tabletsData}
      getOptionLabel={(option) => `${option.itemNumber}||${option.item_name}`}
      onChange={(event, newValue) => {
        settabletsData(newValue);
        // setseletcedCategoryID(newValue.RecordID);
    }}
    
      renderInput={(params) => <TextField {...params} label="Select MedicalItems" />}
    />
        {/* <FormikCustomAutocompleteTabletsID
          sx={{ width: 300 }}
          name="Tablets"
          id="Tablets"
          value={tabletsData}
          onChange={handleSelectiontabletsData}
          label="Barcode/Enter Material Name - SSDD"
          url={`http://127.0.0.1:5000/api/related-items/${seletcedCategoryID}`}
        /> */}
  
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
const[adValue,setADValue]=useState(0);
 const handleadditionalDiscountChange=(event)=>{
  setADValue(event.target.value);
 }
 const[roundOff,setRoundOff]=useState(0);
 const handleroundOffChange=(event)=>{
  setRoundOff(event.target.value);
 }


//==========================================CALCULATION=============================================================//
  const totalAmount = useMemo(() => {
    return rows.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);
  }, [rows]);

const netTotalDiscountAmount = useMemo(() => {
  return rows.reduce((sum, row) => sum + (Number(row.discountAmount) || 0), 0);
}, [rows]);

const netTotalCGSTAmount = useMemo(() => {
  return rows.reduce((sum, row) => sum + (Number(row.cgstAmount) || 0), 0);
}, [rows]);

const netTotalSGSTAmount = useMemo(() => {
  return rows.reduce((sum, row) => sum + (Number(row.sgstAmount) || 0), 0);
}, [rows]);
const netTotalGSTAmount = useMemo(() => {
  return rows.reduce((sum, row) => sum + (Number(row.gstAmount) || 0), 0);
}, [rows]);

const totalGSTAmount = Number(netTotalCGSTAmount + netTotalSGSTAmount + netTotalGSTAmount);
console.log(netTotalCGSTAmount,'=========================netTotalCGSTAmount');
const netTotalADDDiscountAmount = useMemo(() => {
  return rows.reduce((sum, row) => sum + (Number(row.discountAmount) || 0), 0) - (Number(adValue) || 0 ) +(Number(roundOff) || 0);
}, [rows, adValue,roundOff]);

// console.log(netTotalADDDiscountAmount,'=========================netTotalADDDiscountAmount');

// console.log(netTotalDiscountAmount,'=========================netTotalDiscountAmount');
//   console.log(totalGSTAmount, '============================totalGstAmount');
//===============================================================================================================================================================//
const queueDate=new window.Date().toISOString().split('T')[0];
console.log(queueDate)
const HandleQueueSave = async(values) => {

  if (!customerRec && !selectedCustoreID) {
    toast.error("Customer Record ID is required!"); // Show an error message
    return; // Prevent execution if the required value is missing
  }
  const idata = rows.map((row) => {
    return {
      Q_RECORDID: row.RecordID,
      Q_UOM: row.uom,
      Q_CUOM: row.cuom,
      Q_EXPIRYDATE: row.expiryDate,
      Q_MRP: row.mrp,
      Q_GST: row.gst,
      Q_CGST: row.cgst,
      Q_SGST: row.sgst,
      Q_ITEMNUMBER: row.ItemNumber,
      Q_ITEMRECORDID:row.ItemRecordID,
      Q_DESCRIPTION: row.Name,
      Q_QUANTITY: row.qty,
      Q_AMOUNT: row.amount, 
      Q_PRICE: row.price,
      Q_DISCOUNT:row.discount,
      Q_DiscountAmount:row.discountAmount, 
      Q_ITEM:row.Item,
      Q_NETTOTAL: totalAmount, // Ensure this value is passed correctly
      Q_GSTTOTALAMOUNT: totalGSTAmount,
      Q_CUSTOMERNAME: customerName || data.customerName,
      Q_HRECORDID:customerRec || selectedCustoreID,
      Q_DATE: queueDate,
      Q_STATUS:"Q",
      Q_ADDITIONALDISCOUNT:adValue,
     
       
    
      // Q_ADDITIONALDISCOUNT:"",
    
      // Q_SUMMARY:"", // Ensure this value is passed correctly
    };
  });
  console.log(idata, '============================idata');
  return;
const response=await dispatch(QueuePost({idata}));
console.log(response, '============================response');

if(response.payload.status==="Y"){
toast.success(response.payload.message)
}else{
  toast.error(response.payload.message)
}
};


const HandlePaySave = async(values) => {
  const idata = rows.map((row) => {
    return {
      Q_RECORDID: row.RecordID,
      Q_UOM: row.uom,
      Q_CUOM: row.cuom,
      Q_EXPIRYDATE: row.expiryDate,
      Q_MRP: row.mrp,
      Q_GST: row.gst,
      Q_CGST: row.cgst,
      Q_SGST: row.sgst,
      Q_ITEMNUMBER: row.ItemNumber,
      Q_ITEMRECORDID:row.ItemRecordID,
      Q_DESCRIPTION: row.Name,
      Q_QUANTITY: row.qty,
      Q_AMOUNT: row.amount, 
      Q_PRICE: row.price,
      Q_DISCOUNT:row.discount,
      Q_ITEM:row.Item,
      Q_NETTOTAL: totalAmount, // Ensure this value is passed correctly
      Q_GSTTOTALAMOUNT: totalGSTAmount,
      Q_CUSTOMERNAME: customerName || data.customerName,
      Q_HRECORDID:customerRec || selectedCustoreID,
      Q_DATE: queueDate,
      Q_STATUS:"P",
      Q_ADDITIONALDISCOUNT:adValue,
    
      // Q_SUMMARY:"", // Ensure this value is passed correctly
    };
  });
  console.log(idata, '============================idata');
  // return;
const response=await dispatch(QueuePost({idata}));
console.log(response, '============================response');

if(response.payload.status==="Y"){
toast.success(response.payload.message)
}else{
  toast.error(response.payload.message)
}
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
    queue: null,
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
                      SLNO:false,
                      discount:false,
                      ItemNumber:false,
                      Name:false,
                      discountAmount:false,
                      sgstAmount:false,
                      cgstAmount:false,
                      gstAmount:false
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
                  Select Items Info
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
      id="netTotal"
      name="netTotal"
      label="Net Total"
      type="text"
      value={totalAmount}
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
      id="discount"
      name="discount"
      label="Discount"
      type="text"
      value={Disc}
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
      id="additionalDiscount"
      name="additionalDiscount"
      label="Additional Discount"
      type="text"
      value={adValue}
      onChange={handleadditionalDiscountChange}
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
      value={roundOff}
      onChange={handleroundOffChange}
      onBlur={handleBlur}
      // disabled
    />
  </Grid>

  <Grid item xs={12} sm={8}>
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      id="netTotal"
      name="netTotal"
      label="Total"
      type="text"
      value={netTotalADDDiscountAmount}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled
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
  sx={{ width: 200 }}
  name="queue"
  id="queue"
  value={values.queue}
  onChange={(event, newValue) => {
    setFieldValue("queue", newValue);
    setselectedCustoreID(newValue ? newValue.RecordID : null);
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
        onClick={() => HandlePaySave()}
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
const categories = [
  { RecordID: 1, name: "Tablets" },
  { RecordID: 2, name: "Syrups" },
  { RecordID: 3, name: "Injections" },
  { RecordID: 4, name: "Capsules" },
  { RecordID: 5, name: "Ointments" },
  { RecordID: 6, name: "Drops" },
  { RecordID: 7, name: "Powders" },
  { RecordID: 8, name: "Suppositories" },
  { RecordID: 9, name: "Patches" },
  { RecordID: 10, name: "Inhalers" }
];

const medicalItems=[
  {
    "item_id": 114,
    "category_id": 1,
    "item_name": "Paracetamol",
    "itemNumber": "TAB-001",
    "price": 50.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2025-12-31",
    "mrp": 55.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 115,
    "category_id": 1,
    "item_name": "Ibuprofen",
    "itemNumber": "TAB-002",
    "price": 60.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2026-06-30",
    "mrp": 65.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 116,
    "category_id": 1,
    "item_name": "Aspirin",
    "itemNumber": "TAB-003",
    "price": 40.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2025-09-15",
    "mrp": 45.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 117,
    "category_id": 1,
    "item_name": "Cetirizine",
    "itemNumber": "TAB-004",
    "price": 30.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2026-01-20",
    "mrp": 35.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 118,
    "category_id": 1,
    "item_name": "Amoxicillin",
    "itemNumber": "TAB-005",
    "price": 100.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2025-07-10",
    "mrp": 110.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 119,
    "category_id": 1,
    "item_name": "Azithromycin",
    "itemNumber": "TAB-006",
    "price": 120.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2025-11-05",
    "mrp": 130.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 120,
    "category_id": 1,
    "item_name": "Metformin",
    "itemNumber": "TAB-007",
    "price": 80.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2026-03-18",
    "mrp": 90.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 121,
    "category_id": 1,
    "item_name": "Atorvastatin",
    "itemNumber": "TAB-008",
    "price": 90.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2026-02-28",
    "mrp": 100.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 122,
    "category_id": 1,
    "item_name": "Levothyroxine",
    "itemNumber": "TAB-009",
    "price": 70.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2025-10-12",
    "mrp": 75.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 123,
    "category_id": 1,
    "item_name": "Losartan",
    "itemNumber": "TAB-010",
    "price": 85.00,
    "uom": "Box",
    "cuom": "Tablet",
    "expirydate": "2026-04-22",
    "mrp": 95.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 201,
    "category_id": 2,
    "item_name": "Paracetamol Syrup",
    "itemNumber": "SYP-001",
    "price": 80.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2025-12-31",
    "mrp": 90.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 202,
    "category_id": 2,
    "item_name": "Ibuprofen Syrup",
    "itemNumber": "SYP-002",
    "price": 85.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2026-06-30",
    "mrp": 95.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 203,
    "category_id": 2,
    "item_name": "Ambroxol Syrup",
    "itemNumber": "SYP-003",
    "price": 70.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2025-09-15",
    "mrp": 80.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 204,
    "category_id": 2,
    "item_name": "Cetirizine Syrup",
    "itemNumber": "SYP-004",
    "price": 65.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2026-01-20",
    "mrp": 75.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 205,
    "category_id": 2,
    "item_name": "Amoxicillin Syrup",
    "itemNumber": "SYP-005",
    "price": 120.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2025-07-10",
    "mrp": 130.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 206,
    "category_id": 2,
    "item_name": "Azithromycin Syrup",
    "itemNumber": "SYP-006",
    "price": 130.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2025-11-05",
    "mrp": 140.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 207,
    "category_id": 2,
    "item_name": "Salbutamol Syrup",
    "itemNumber": "SYP-007",
    "price": 90.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2026-03-18",
    "mrp": 100.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 208,
    "category_id": 2,
    "item_name": "Dextromethorphan Syrup",
    "itemNumber": "SYP-008",
    "price": 95.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2026-02-28",
    "mrp": 105.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 209,
    "category_id": 2,
    "item_name": "Chlorpheniramine Syrup",
    "itemNumber": "SYP-009",
    "price": 75.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2025-10-12",
    "mrp": 85.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 5.00
  },
  {
    "item_id": 210,
    "category_id": 2,
    "item_name": "Diphenhydramine Syrup",
    "itemNumber": "SYP-010",
    "price": 88.00,
    "uom": "Bottle",
    "cuom": "ml",
    "expirydate": "2026-04-22",
    "mrp": 98.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 301,
    "category_id": 3,
    "item_name": "Ceftriaxone Injection",
    "itemNumber": "INJ-001",
    "price": 150.00,
    "uom": "Vial",
    "cuom": "ml",
    "expirydate": "2025-12-31",
    "mrp": 165.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 302,
    "category_id": 3,
    "item_name": "Amikacin Injection",
    "itemNumber": "INJ-002",
    "price": 180.00,
    "uom": "Vial",
    "cuom": "ml",
    "expirydate": "2026-06-30",
    "mrp": 200.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 15.00
  },
  {
    "item_id": 303,
    "category_id": 3,
    "item_name": "Gentamicin Injection",
    "itemNumber": "INJ-003",
    "price": 120.00,
    "uom": "Vial",
    "cuom": "ml",
    "expirydate": "2025-09-15",
    "mrp": 135.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 304,
    "category_id": 3,
    "item_name": "Diclofenac Injection",
    "itemNumber": "INJ-004",
    "price": 90.00,
    "uom": "Ampoule",
    "cuom": "ml",
    "expirydate": "2026-01-20",
    "mrp": 105.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 305,
    "category_id": 3,
    "item_name": "Ondansetron Injection",
    "itemNumber": "INJ-005",
    "price": 110.00,
    "uom": "Ampoule",
    "cuom": "ml",
    "expirydate": "2025-07-10",
    "mrp": 125.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 306,
    "category_id": 3,
    "item_name": "Pantoprazole Injection",
    "itemNumber": "INJ-006",
    "price": 200.00,
    "uom": "Vial",
    "cuom": "ml",
    "expirydate": "2025-11-05",
    "mrp": 220.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 15.00
  },
  {
    "item_id": 307,
    "category_id": 3,
    "item_name": "Insulin Injection",
    "itemNumber": "INJ-007",
    "price": 250.00,
    "uom": "Pen",
    "cuom": "ml",
    "expirydate": "2026-03-18",
    "mrp": 280.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 20.00
  },
  {
    "item_id": 308,
    "category_id": 3,
    "item_name": "Heparin Injection",
    "itemNumber": "INJ-008",
    "price": 300.00,
    "uom": "Vial",
    "cuom": "ml",
    "expirydate": "2026-02-28",
    "mrp": 330.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 25.00
  },
  {
    "item_id": 309,
    "category_id": 3,
    "item_name": "Adrenaline Injection",
    "itemNumber": "INJ-009",
    "price": 140.00,
    "uom": "Ampoule",
    "cuom": "ml",
    "expirydate": "2025-10-12",
    "mrp": 155.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 310,
    "category_id": 3,
    "item_name": "Vitamin B12 Injection",
    "itemNumber": "INJ-010",
    "price": 160.00,
    "uom": "Ampoule",
    "cuom": "ml",
    "expirydate": "2026-04-22",
    "mrp": 180.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 15.00
  },
  {
    "item_id": 201,
    "category_id": 4,
    "item_name": "Amoxicillin Capsule",
    "itemNumber": "CAP-001",
    "price": 100.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2025-12-31",
    "mrp": 115.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 202,
    "category_id": 4,
    "item_name": "Doxycycline Capsule",
    "itemNumber": "CAP-002",
    "price": 120.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2026-06-30",
    "mrp": 135.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 12.00
  },
  {
    "item_id": 203,
    "category_id": 4,
    "item_name": "Omeprazole Capsule",
    "itemNumber": "CAP-003",
    "price": 80.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2025-09-15",
    "mrp": 95.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 8.00
  },
  {
    "item_id": 204,
    "category_id": 4,
    "item_name": "Vitamin D3 Capsule",
    "itemNumber": "CAP-004",
    "price": 90.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2026-01-20",
    "mrp": 105.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 9.00
  },
  {
    "item_id": 205,
    "category_id": 4,
    "item_name": "Fish Oil Capsule",
    "itemNumber": "CAP-005",
    "price": 150.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2025-07-10",
    "mrp": 170.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 15.00
  },
  {
    "item_id": 206,
    "category_id": 4,
    "item_name": "B-Complex Capsule",
    "itemNumber": "CAP-006",
    "price": 130.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2025-11-05",
    "mrp": 145.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 12.00
  },
  {
    "item_id": 207,
    "category_id": 4,
    "item_name": "Iron Capsule",
    "itemNumber": "CAP-007",
    "price": 110.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2026-03-18",
    "mrp": 125.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 208,
    "category_id": 4,
    "item_name": "Calcium Capsule",
    "itemNumber": "CAP-008",
    "price": 160.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2026-02-28",
    "mrp": 180.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 15.00
  },
  {
    "item_id": 209,
    "category_id": 4,
    "item_name": "Probiotic Capsule",
    "itemNumber": "CAP-009",
    "price": 140.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2025-10-12",
    "mrp": 155.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 12.00
  },
  {
    "item_id": 210,
    "category_id": 4,
    "item_name": "Collagen Capsule",
    "itemNumber": "CAP-010",
    "price": 180.00,
    "uom": "Box",
    "cuom": "Capsule",
    "expirydate": "2026-04-22",
    "mrp": 200.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 18.00
  },
  {
    "item_id": 301,
    "category_id": 5,
    "item_name": "Neomycin Ointment",
    "itemNumber": "OINT-001",
    "price": 75.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2025-12-31",
    "mrp": 85.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 7.50
  },
  {
    "item_id": 302,
    "category_id": 5,
    "item_name": "Betamethasone Ointment",
    "itemNumber": "OINT-002",
    "price": 90.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2026-06-30",
    "mrp": 105.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 9.00
  },
  {
    "item_id": 303,
    "category_id": 5,
    "item_name": "Mupirocin Ointment",
    "itemNumber": "OINT-003",
    "price": 120.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2025-09-15",
    "mrp": 135.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 12.00
  },
  {
    "item_id": 304,
    "category_id": 5,
    "item_name": "Clotrimazole Ointment",
    "itemNumber": "OINT-004",
    "price": 85.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2026-01-20",
    "mrp": 95.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 8.50
  },
  {
    "item_id": 305,
    "category_id": 5,
    "item_name": "Diclofenac Gel",
    "itemNumber": "OINT-005",
    "price": 110.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2025-07-10",
    "mrp": 125.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 11.00
  },
  {
    "item_id": 306,
    "category_id": 5,
    "item_name": "Hydrocortisone Ointment",
    "itemNumber": "OINT-006",
    "price": 95.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2025-11-05",
    "mrp": 110.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 9.50
  },
  {
    "item_id": 307,
    "category_id": 5,
    "item_name": "Tacrolimus Ointment",
    "itemNumber": "OINT-007",
    "price": 180.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2026-03-18",
    "mrp": 200.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 18.00
  },
  {
    "item_id": 308,
    "category_id": 5,
    "item_name": "Salicylic Acid Ointment",
    "itemNumber": "OINT-008",
    "price": 70.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2026-02-28",
    "mrp": 85.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 7.00
  },
  {
    "item_id": 309,
    "category_id": 5,
    "item_name": "Lidocaine Ointment",
    "itemNumber": "OINT-009",
    "price": 130.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2025-10-12",
    "mrp": 145.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 13.00
  },
  {
    "item_id": 310,
    "category_id": 5,
    "item_name": "Zinc Oxide Ointment",
    "itemNumber": "OINT-010",
    "price": 60.00,
    "uom": "Tube",
    "cuom": "Gram",
    "expirydate": "2026-04-22",
    "mrp": 75.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 6.00
  },
  {
    "item_id": 401,
    "category_id": 6,
    "item_name": "Tobramycin Eye Drops",
    "itemNumber": "DROP-001",
    "price": 120.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-12-31",
    "mrp": 135.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 12.00
  },
  {
    "item_id": 402,
    "category_id": 6,
    "item_name": "Ciprofloxacin Ear Drops",
    "itemNumber": "DROP-002",
    "price": 95.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-06-30",
    "mrp": 110.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 9.50
  },
  {
    "item_id": 403,
    "category_id": 6,
    "item_name": "Carboxymethylcellulose Eye Drops",
    "itemNumber": "DROP-003",
    "price": 150.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-09-15",
    "mrp": 165.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 15.00
  },
  {
    "item_id": 404,
    "category_id": 6,
    "item_name": "Olopatadine Eye Drops",
    "itemNumber": "DROP-004",
    "price": 110.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-01-20",
    "mrp": 125.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 11.00
  },
  {
    "item_id": 405,
    "category_id": 6,
    "item_name": "Ofloxacin Ear Drops",
    "itemNumber": "DROP-005",
    "price": 130.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-07-10",
    "mrp": 145.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 13.00
  },
  {
    "item_id": 406,
    "category_id": 6,
    "item_name": "Moxifloxacin Eye Drops",
    "itemNumber": "DROP-006",
    "price": 140.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-11-05",
    "mrp": 155.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 14.00
  },
  {
    "item_id": 407,
    "category_id": 6,
    "item_name": "Dexamethasone Eye Drops",
    "itemNumber": "DROP-007",
    "price": 160.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-03-18",
    "mrp": 175.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 16.00
  },
  {
    "item_id": 408,
    "category_id": 6,
    "item_name": "Ketorolac Eye Drops",
    "itemNumber": "DROP-008",
    "price": 125.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-02-28",
    "mrp": 140.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 12.50
  },
  {
    "item_id": 409,
    "category_id": 6,
    "item_name": "Fluorometholone Eye Drops",
    "itemNumber": "DROP-009",
    "price": 135.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-10-12",
    "mrp": 150.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 13.50
  },
  {
    "item_id": 410,
    "category_id": 6,
    "item_name": "Gentamicin Eye Drops",
    "itemNumber": "DROP-010",
    "price": 100.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-04-22",
    "mrp": 115.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 501,
    "category_id": 7,
    "item_name": "Brimonidine Eye Drops",
    "itemNumber": "DROP-011",
    "price": 140.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-12-31",
    "mrp": 155.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 14.00
  },
  {
    "item_id": 502,
    "category_id": 7,
    "item_name": "Bimatoprost Eye Drops",
    "itemNumber": "DROP-012",
    "price": 160.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-06-30",
    "mrp": 175.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 16.00
  },
  {
    "item_id": 503,
    "category_id": 7,
    "item_name": "Dorzolamide Eye Drops",
    "itemNumber": "DROP-013",
    "price": 130.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-09-15",
    "mrp": 145.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 13.00
  },
  {
    "item_id": 504,
    "category_id": 7,
    "item_name": "Travoprost Eye Drops",
    "itemNumber": "DROP-014",
    "price": 170.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-01-20",
    "mrp": 185.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 17.00
  },
  {
    "item_id": 505,
    "category_id": 7,
    "item_name": "Pilocarpine Eye Drops",
    "itemNumber": "DROP-015",
    "price": 120.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-07-10",
    "mrp": 135.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 12.00
  },
  {
    "item_id": 506,
    "category_id": 7,
    "item_name": "Latanoprost Eye Drops",
    "itemNumber": "DROP-016",
    "price": 190.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-11-05",
    "mrp": 205.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 19.00
  },
  {
    "item_id": 507,
    "category_id": 7,
    "item_name": "Nepafenac Eye Drops",
    "itemNumber": "DROP-017",
    "price": 145.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-03-18",
    "mrp": 160.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 14.50
  },
  {
    "item_id": 508,
    "category_id": 7,
    "item_name": "Ketotifen Eye Drops",
    "itemNumber": "DROP-018",
    "price": 135.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-02-28",
    "mrp": 150.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 13.50
  },
  {
    "item_id": 509,
    "category_id": 7,
    "item_name": "Fluorometholone Eye Drops",
    "itemNumber": "DROP-019",
    "price": 125.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2025-10-12",
    "mrp": 140.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 12.50
  },
  {
    "item_id": 510,
    "category_id": 7,
    "item_name": "Apraclonidine Eye Drops",
    "itemNumber": "DROP-020",
    "price": 155.00,
    "uom": "Bottle",
    "cuom": "mL",
    "expirydate": "2026-04-22",
    "mrp": 170.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 15.50
  },
  {
    "item_id": 601,
    "category_id": 8,
    "item_name": "Protein Powder",
    "itemNumber": "POW-001",
    "price": 450.00,
    "uom": "Jar",
    "cuom": "Gram",
    "expirydate": "2026-12-31",
    "mrp": 500.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 50.00
  },
  {
    "item_id": 602,
    "category_id": 8,
    "item_name": "ORS Powder",
    "itemNumber": "POW-002",
    "price": 30.00,
    "uom": "Sachet",
    "cuom": "Gram",
    "expirydate": "2025-06-30",
    "mrp": 35.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 3.00
  },
  {
    "item_id": 603,
    "category_id": 8,
    "item_name": "Glucose Powder",
    "itemNumber": "POW-003",
    "price": 150.00,
    "uom": "Box",
    "cuom": "Gram",
    "expirydate": "2026-09-15",
    "mrp": 170.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 15.00
  },
  {
    "item_id": 604,
    "category_id": 8,
    "item_name": "Electrolyte Powder",
    "itemNumber": "POW-004",
    "price": 180.00,
    "uom": "Box",
    "cuom": "Gram",
    "expirydate": "2026-01-20",
    "mrp": 200.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 18.00
  },
  {
    "item_id": 605,
    "category_id": 8,
    "item_name": "Collagen Powder",
    "itemNumber": "POW-005",
    "price": 600.00,
    "uom": "Jar",
    "cuom": "Gram",
    "expirydate": "2025-07-10",
    "mrp": 650.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 60.00
  },
  {
    "item_id": 606,
    "category_id": 8,
    "item_name": "Lactose Powder",
    "itemNumber": "POW-006",
    "price": 200.00,
    "uom": "Packet",
    "cuom": "Gram",
    "expirydate": "2025-11-05",
    "mrp": 220.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 20.00
  },
  {
    "item_id": 607,
    "category_id": 8,
    "item_name": "Creatine Powder",
    "itemNumber": "POW-007",
    "price": 750.00,
    "uom": "Jar",
    "cuom": "Gram",
    "expirydate": "2026-03-18",
    "mrp": 800.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 75.00
  },
  {
    "item_id": 608,
    "category_id": 8,
    "item_name": "Vitamin C Powder",
    "itemNumber": "POW-008",
    "price": 250.00,
    "uom": "Box",
    "cuom": "Gram",
    "expirydate": "2026-02-28",
    "mrp": 275.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 25.00
  },
  {
    "item_id": 609,
    "category_id": 8,
    "item_name": "Ayurvedic Herbal Powder",
    "itemNumber": "POW-009",
    "price": 350.00,
    "uom": "Box",
    "cuom": "Gram",
    "expirydate": "2025-10-12",
    "mrp": 380.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 35.00
  },
  {
    "item_id": 610,
    "category_id": 8,
    "item_name": "Baby Powder",
    "itemNumber": "POW-010",
    "price": 180.00,
    "uom": "Bottle",
    "cuom": "Gram",
    "expirydate": "2026-04-22",
    "mrp": 200.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 18.00
  },
  {
    "item_id": 701,
    "category_id": 9,
    "item_name": "Pain Relief Patch",
    "itemNumber": "PAT-001",
    "price": 120.00,
    "uom": "Pack",
    "cuom": "Patch",
    "expirydate": "2026-12-31",
    "mrp": 140.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 12.00
  },
  {
    "item_id": 702,
    "category_id": 9,
    "item_name": "Nicotine Patch",
    "itemNumber": "PAT-002",
    "price": 350.00,
    "uom": "Box",
    "cuom": "Patch",
    "expirydate": "2025-06-30",
    "mrp": 400.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 35.00
  },
  {
    "item_id": 703,
    "category_id": 9,
    "item_name": "Cooling Gel Patch",
    "itemNumber": "PAT-003",
    "price": 80.00,
    "uom": "Pack",
    "cuom": "Patch",
    "expirydate": "2026-09-15",
    "mrp": 90.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 8.00
  },
  {
    "item_id": 704,
    "category_id": 9,
    "item_name": "Fever Cooling Patch",
    "itemNumber": "PAT-004",
    "price": 100.00,
    "uom": "Pack",
    "cuom": "Patch",
    "expirydate": "2026-01-20",
    "mrp": 120.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 10.00
  },
  {
    "item_id": 705,
    "category_id": 9,
    "item_name": "Motion Sickness Patch",
    "itemNumber": "PAT-005",
    "price": 250.00,
    "uom": "Box",
    "cuom": "Patch",
    "expirydate": "2025-07-10",
    "mrp": 275.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 25.00
  },
  {
    "item_id": 706,
    "category_id": 9,
    "item_name": "Herbal Pain Patch",
    "itemNumber": "PAT-006",
    "price": 150.00,
    "uom": "Pack",
    "cuom": "Patch",
    "expirydate": "2025-11-05",
    "mrp": 170.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 15.00
  },
  {
    "item_id": 707,
    "category_id": 9,
    "item_name": "Heat Therapy Patch",
    "itemNumber": "PAT-007",
    "price": 300.00,
    "uom": "Box",
    "cuom": "Patch",
    "expirydate": "2026-03-18",
    "mrp": 330.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 30.00
  },
  {
    "item_id": 708,
    "category_id": 9,
    "item_name": "Detox Foot Patch",
    "itemNumber": "PAT-008",
    "price": 200.00,
    "uom": "Pack",
    "cuom": "Patch",
    "expirydate": "2026-02-28",
    "mrp": 220.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 20.00
  },
  {
    "item_id": 709,
    "category_id": 9,
    "item_name": "Anti-Stress Patch",
    "itemNumber": "PAT-009",
    "price": 275.00,
    "uom": "Box",
    "cuom": "Patch",
    "expirydate": "2025-10-12",
    "mrp": 300.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 27.00
  },
  {
    "item_id": 710,
    "category_id": 9,
    "item_name": "Skin Care Patch",
    "itemNumber": "PAT-010",
    "price": 180.00,
    "uom": "Pack",
    "cuom": "Patch",
    "expirydate": "2026-04-22",
    "mrp": 200.00,
    "gst": 5,
    "cgst": 2.5,
    "sgst": 2.5,
    "DISCOUNT": 18.00
  },
  {
    "item_id": 801,
    "category_id": 10,
    "item_name": "Salbutamol Inhaler",
    "itemNumber": "INH-001",
    "price": 250.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2026-12-31",
    "mrp": 280.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 25.00
  },
  {
    "item_id": 802,
    "category_id": 10,
    "item_name": "Budesonide Inhaler",
    "itemNumber": "INH-002",
    "price": 300.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2025-06-30",
    "mrp": 340.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 30.00
  },
  {
    "item_id": 803,
    "category_id": 10,
    "item_name": "Fluticasone Inhaler",
    "itemNumber": "INH-003",
    "price": 350.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2026-09-15",
    "mrp": 400.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 35.00
  },
  {
    "item_id": 804,
    "category_id": 10,
    "item_name": "Ipratropium Bromide Inhaler",
    "itemNumber": "INH-004",
    "price": 280.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2026-01-20",
    "mrp": 310.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 28.00
  },
  {
    "item_id": 805,
    "category_id": 10,
    "item_name": "Tiotropium Inhaler",
    "itemNumber": "INH-005",
    "price": 320.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2025-07-10",
    "mrp": 350.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 32.00
  },
  {
    "item_id": 806,
    "category_id": 10,
    "item_name": "Formoterol Inhaler",
    "itemNumber": "INH-006",
    "price": 400.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2025-11-05",
    "mrp": 450.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 40.00
  },
  {
    "item_id": 807,
    "category_id": 10,
    "item_name": "Ciclesonide Inhaler",
    "itemNumber": "INH-007",
    "price": 270.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2026-03-18",
    "mrp": 300.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 27.00
  },
  {
    "item_id": 808,
    "category_id": 10,
    "item_name": "Beclomethasone Inhaler",
    "itemNumber": "INH-008",
    "price": 330.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2026-02-28",
    "mrp": 360.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 33.00
  },
  {
    "item_id": 809,
    "category_id": 10,
    "item_name": "Levosalbutamol Inhaler",
    "itemNumber": "INH-009",
    "price": 290.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2025-10-12",
    "mrp": 320.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 29.00
  },
  {
    "item_id": 810,
    "category_id": 10,
    "item_name": "Aclidinium Inhaler",
    "itemNumber": "INH-010",
    "price": 370.00,
    "uom": "Box",
    "cuom": "Inhaler",
    "expirydate": "2026-04-22",
    "mrp": 400.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 37.00
  },
  {
    "item_id": 901,
    "category_id": 11,
    "item_name": "Glycerin Suppository",
    "itemNumber": "SUP-001",
    "price": 150.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2026-12-31",
    "mrp": 180.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 15.00
  },
  {
    "item_id": 902,
    "category_id": 11,
    "item_name": "Bisacodyl Suppository",
    "itemNumber": "SUP-002",
    "price": 200.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2025-06-30",
    "mrp": 220.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 20.00
  },
  {
    "item_id": 903,
    "category_id": 11,
    "item_name": "Paracetamol Suppository",
    "itemNumber": "SUP-003",
    "price": 250.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2026-09-15",
    "mrp": 280.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 25.00
  },
  {
    "item_id": 904,
    "category_id": 11,
    "item_name": "Ibuprofen Suppository",
    "itemNumber": "SUP-004",
    "price": 180.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2026-01-20",
    "mrp": 200.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 18.00
  },
  {
    "item_id": 905,
    "category_id": 11,
    "item_name": "Dulcolax Suppository",
    "itemNumber": "SUP-005",
    "price": 220.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2025-07-10",
    "mrp": 250.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 22.00
  },
  {
    "item_id": 906,
    "category_id": 11,
    "item_name": "Acetaminophen Suppository",
    "itemNumber": "SUP-006",
    "price": 270.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2025-11-05",
    "mrp": 300.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 27.00
  },
  {
    "item_id": 907,
    "category_id": 11,
    "item_name": "Hydrocortisone Suppository",
    "itemNumber": "SUP-007",
    "price": 190.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2026-03-18",
    "mrp": 220.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 19.00
  },
  {
    "item_id": 908,
    "category_id": 11,
    "item_name": "Indomethacin Suppository",
    "itemNumber": "SUP-008",
    "price": 230.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2026-02-28",
    "mrp": 260.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 23.00
  },
  {
    "item_id": 909,
    "category_id": 11,
    "item_name": "Metronidazole Suppository",
    "itemNumber": "SUP-009",
    "price": 210.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2025-10-12",
    "mrp": 240.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 21.00
  },
  {
    "item_id": 910,
    "category_id": 11,
    "item_name": "Chloral Hydrate Suppository",
    "itemNumber": "SUP-010",
    "price": 260.00,
    "uom": "Box",
    "cuom": "Suppository",
    "expirydate": "2026-04-22",
    "mrp": 290.00,
    "gst": 12,
    "cgst": 6,
    "sgst": 6,
    "DISCOUNT": 26.00
  }
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