import React from "react";
import {
  LinearProgress,
  Paper,
  Button,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  TextField,
  Stack,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { dataGridRowHeight } from "app/utils/constant";
import { Formik } from "formik";

// ********************** ICONS ********************** //
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Add } from "@mui/icons-material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />


// ********************** STYLED COMPONENTS ********************** //
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

// ********************** PRICE LIST EDIT SCREEN  ********************** //
const PriceListEdit = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const navigate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    {
      headerName: "Item Number",
      field: "Item_Number",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Item Description",
      field: "Item_Description",
      width: "350",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      field: "Action",
      headerName: "Attributes",
      minWidth: 100,
      flex: 1,
      sortable: false,
      headerAlign: "center",
      filterable: false,
      disableColumnMenu: true,
      disableExport: true,
      align: "center",
      renderCell: (param) => {
        return (
          <Button
            sx={{ height: 25 }}
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => navigate("./item-attributes")}
            startIcon={<ModeEditOutlineIcon size="small" />}
            disabled={params.mode === "delete" ?true:false}
          >
            Edit
          </Button>
        );
      },
    },
    {
      headerName: "Brand",
      field: "Brand",
      width: "100",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Item Buyer",
      field: "Item_Buyer",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },

    {
      headerName: "Secoundry Class",
      field: "Secondary_Class",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Aleternate Class 1",
      field: "Alternate_Class_1",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Aleternate Class 2",
      field: "Alternate_Class_2",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Fresh Frozen Dry",
      field: "Fresh_Frozen_Dry",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Commodity",
      field: "Commodity",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "FW or CW",
      field: "FW_or_CW",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Item Class Description",
      field: "Item_Class_Description",
      width: "200",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Commodity PL",
      field: "Commodity_PL",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Primary Vendor",
      field: "Primary_Vendor_ID",
      width: "200",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Primary Vendor Name",
      field: "Primary_Vendor_Name",
      width: "250",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "PreOrder",
      field: "PreOrder",
      width: "200",
      align: "Right",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "SpecialOrder",
      field: "SpecialOrder",
      width: "200",
      align: "Right",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "ItemShipWeight",
      field: "ItemShipWeight",
      width: "200",
      align: "Right",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "UOfM",
      field: "UOfM",
      width: "170",
      align: "Right",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "QtyInBaseUOfM",
      field: "QtyInBaseUOfM",
      width: "200",
      align: "Right",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "VendorItemNo",
      field: "VendorItemNo",
      width: "200",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "ABCCode",
      field: "ABCCode",
      width: "170",
      align: "Right",
      headerAlign: "left",
      hide: true,
    },
  ];

  const rows = [
    {
      item_key: 253,
      Item_Number: "017832D",
      Item_Description: "Beef Sukiyaki Meat v3 - 1/Bx Cvp (Vanguard)",
      Brand: "Vanguard",
      Item_Buyer: "scott",
      Secondary_Class: "Shortribs",
      Alternate_Class_1: "Damaged",
      Alternate_Class_2: "Vanguard",
      Fresh_Frozen_Dry: "Frozen",
      Commodity: "Vanguard",
      FW_or_CW: "Catch Weight",
      Item_Class_Description: "Beef, Frozen Vanguard",
      Commodity_PL: "Beef",
      Primary_Vendor_ID: 650155,
      Primary_Vendor_Name: "Vanguard Foods",
      PreOrder: 0,
      SpecialOrder: 0,
      dss_create_time: "06:16.0",
      dss_update_time: "00:02.8",
      Item_Type: 1,
      Item_Class_Code: 241,
      ItemShipWeight: 100,
      UOfM: "LB",
      QtyInBaseUOfM: 10.76,
      VendorItemNo: "017832D",
      SalesGLIndx: 545,
      ABCCode: "",
    },
    {
      item_key: 254,
      Item_Number: "17833",
      Item_Description: "Diced Special Trim Frs - 4/10# Cvp (Vanguard)",
      Brand: "Vanguard",
      Item_Buyer: "scott",
      Secondary_Class: "Special Trim",
      Alternate_Class_1: "PPC",
      Alternate_Class_2: "Vanguard",
      Fresh_Frozen_Dry: "Fresh",
      Commodity: "Vanguard",
      FW_or_CW: "Catch Weight",
      Item_Class_Description: "Beef, Fresh Vanguard",
      Commodity_PL: "Beef",
      Primary_Vendor_ID: 650155,
      Primary_Vendor_Name: "Vanguard Foods",
      PreOrder: 0,
      SpecialOrder: 0,
      dss_create_time: "06:16.0",
      dss_update_time: "00:02.8",
      Item_Type: 1,
      Item_Class_Code: 231,
      ItemShipWeight: 100,
      UOfM: "LB",
      QtyInBaseUOfM: 39.505,
      VendorItemNo: "17833",
      SalesGLIndx: 545,
      ABCCode: "",
    },
    {
      item_key: 255,
      Item_Number: "17834",
      Item_Description: 'Lipon Ch 3/4" Fs - 3/Cvp 40# (Vanguard)',
      Brand: "Vanguard",
      Item_Buyer: "scott",
      Secondary_Class: "Lipon Ribeye",
      Alternate_Class_1: "PPC",
      Alternate_Class_2: "Vanguard",
      Fresh_Frozen_Dry: "Fresh",
      Commodity: "Vanguard",
      FW_or_CW: "Catch Weight",
      Item_Class_Description: "Beef, Fresh Vanguard",
      Commodity_PL: "Beef",
      Primary_Vendor_ID: 650155,
      Primary_Vendor_Name: "Vanguard Foods",
      PreOrder: 0,
      SpecialOrder: 0,
      dss_create_time: "06:16.0",
      dss_update_time: "00:02.8",
      Item_Type: 1,
      Item_Class_Code: 231,
      ItemShipWeight: 100,
      UOfM: "LB",
      QtyInBaseUOfM: 8.7444,
      VendorItemNo: "17834",
      SalesGLIndx: 545,
      ABCCode: "",
    },
    {
      item_key: 256,
      Item_Number: "17835",
      Item_Description: "Diced Knuckle 3/8 Fs - 4/10# Cvp (Vanguard)",
      Brand: "Vanguard",
      Item_Buyer: "scott",
      Secondary_Class: "Knuckles",
      Alternate_Class_1: "PPC",
      Alternate_Class_2: "Vanguard",
      Fresh_Frozen_Dry: "Fresh",
      Commodity: "Vanguard",
      FW_or_CW: "Catch Weight",
      Item_Class_Description: "Beef, Fresh Vanguard",
      Commodity_PL: "Beef",
      Primary_Vendor_ID: 650155,
      Primary_Vendor_Name: "Vanguard Foods",
      PreOrder: 0,
      SpecialOrder: 0,
      dss_create_time: "06:16.0",
      dss_update_time: "00:02.8",
      Item_Type: 1,
      Item_Class_Code: 231,
      ItemShipWeight: 100,
      UOfM: "LB",
      QtyInBaseUOfM: 42.8077,
      VendorItemNo: "17835",
      SalesGLIndx: 545,
      ABCCode: "",
    },
    {
      item_key: 257,
      Item_Number: "230",
      Item_Description: "Admin-Beef - Admin ()",
      Brand: "",
      Item_Buyer: "Other",
      Secondary_Class: "Other",
      Alternate_Class_1: "",
      Alternate_Class_2: "Slaughter",
      Fresh_Frozen_Dry: "Fresh",
      Commodity: "Beef",
      FW_or_CW: "Fixed Weight",
      Item_Class_Description: "Beef, Fresh",
      Commodity_PL: "Beef",
      Primary_Vendor_ID: 500199,
      Primary_Vendor_Name: "Admin",
      PreOrder: 0,
      SpecialOrder: 0,
      dss_create_time: "06:16.0",
      dss_update_time: "00:02.8",
      Item_Type: 1,
      Item_Class_Code: 230,
      ItemShipWeight: 100,
      UOfM: "CS",
      QtyInBaseUOfM: 1,
      VendorItemNo: "230",
      SalesGLIndx: 143,
      ABCCode: "",
    },
  ];

  // ********************** TOOLBAR ********************** //
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          padding: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            paddingX: 2,
            width: "100%",
          }}
        >
          <GridToolbarQuickFilter />
          <Autocomplete
            fullWidth={!isNonMobile}
            disablePortal
            options={rows}
            sx={{ width: 300 }}
            variant="outlined"
            type="text"
            id="adHocItem"
            name="adHocItem"
            size="small"
            getOptionLabel={(option) => option.Item_Description}
            renderInput={(params) => (
              <TextField {...params} label="Ad Hoc Item" />
            )}
          />
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => {
              console.log("Creating Price List...");
            }}
            startIcon={<Add size="small" />}
            disabled={params.mode === "delete" ?true:false}
          >
            Ad Hoc Item
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <Formik
        initialValues={{
          priceListID: "",
          priceListDescription: "",
          buyer: null,
          majorListGroup: null,
          forcePageBreak: false,
          headerOnly: false,
          overrideSeq: false,
          propCustomer: [],
          createdDateTime: "",
          lastModifiedDateTime: "",
          createdBy: "",
          lstcnttm: "",
          comments1: "",
          comments2: "",
          comments3: "",
          comments4: "",
          comments5: "",
        }}
        enableReinitialize={true}
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
                  { name: "Price Book" },
                  { name: "Price List", path: "/pages/price-list" },
                  { name: `${params.mode} Price List` },
                ]}
              />
              <Stack direction={"row"} gap={1}>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={ params.mode === "delete" ? <DeleteIcon color="error" size="small" />:<SaveIcon size="small" />}
                  type="submit"
                >
                 {params.mode === "delete" ? "Confirm" : "Save"} 
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={<ArrowBackIcon size="small" />}
                  onClick={() => navigate("/pages/items")}
                >
                  Back To Items
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={<ArrowBackIcon size="small" />}
                  onClick={() => navigate("/pages/price-list")}
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
                <Stack sx={{ gridColumn: "span 1" }} direction="column" gap={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="priceListID"
                    name="priceListID"
                    label="Price List ID"
                    required
                    InputLabelProps={{
                      sx: { "& .MuiInputLabel-asterisk": { color: "red" } },
                    }}
                    size="small"
                    //   error={!!touched.priceListID && !!errors.priceListID}
                    //   helperText={touched.priceListID && errors.priceListID}
                    disabled={params.mode === "delete" ?true:false}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="priceListDescription"
                    name="priceListDescription"
                    label="Price List Description"
                    size="small"
                    //   error={!!touched.priceListDescription && !!errors.priceListDescription}
                    //   helperText={touched.priceListDescription && errors.priceListDescription}
                    disabled={params.mode === "delete" ?true:false}
                  />
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={buyer}
                    variant="outlined"
                    type="text"
                    id="buyer"
                    name="buyer"
                    size="small"
                    getOptionLabel={(option) => option.ITEM_BUYER}
                    renderInput={(params) => (
                      <TextField {...params} label="Buyer" />
                    )}
                    disabled={params.mode === "delete" ?true:false}
                  />
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={majarGroup}
                    variant="outlined"
                    type="text"
                    id="majorListGroup"
                    name="majorListGroup"
                    size="small"
                    disabled={params.mode === "delete" ?true:false}
                    getOptionLabel={(option) => option.ppc_MajorListGroup}
                    renderInput={(params) => (
                      <TextField {...params} label="Major List Group" />
                    )}
                  />
                </Stack>
                <Stack sx={{ gridColumn: "span 1" }} direction="column" gap={1}>
                  <FormControlLabel
                    sx={{ color: theme.palette.warning.main }}
                    control={
                      <Checkbox
                        size="small"
                        id="forcePageBreak"
                        name="forcePageBreak"
                        disabled={params.mode === "delete" ?true:false}
                      />
                    }
                    label="Force Page Break"
                  />
                  {/* <FormControlLabel
                    sx={{color:theme.palette.warning.main}}
                    control={
                      <Checkbox
                        size="small"
                        id="headerOnly"
                        name="headerOnly"
                      />
                    }
                    label="Header Only"
                  /> */}
                  <FormControlLabel
                    sx={{ color: theme.palette.warning.main }}
                    control={
                      <Checkbox
                        size="small"
                        id="overrideSeq"
                        name="overrideSeq"
                        disabled={params.mode === "delete" ?true:false}
                      />
                    }
                    label="Override Seq"
                  />
                  <Autocomplete
                   disabled={params.mode === "delete" ?true:false}
                    fullWidth
                    disablePortal
                    options={[]}
                    variant="outlined"
                    type="text"
                    id="propCustomer"
                    name="propCustomer"
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Prop Customer" />
                    )}
                  />
                </Stack>
                <Stack sx={{ gridColumn: "span 1" }} direction="column" gap={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="createdDateTime"
                    name="createdDateTime"
                    label="Created Date Time"
                    size="small"
                    inputProps={{ readOnly: true }}
                    disabled={params.mode === "delete" ?true:false}
                    //   error={!!touched.createdDateTime && !!errors.createdDateTime}
                    //   helperText={touched.createdDateTime && errors.createdDateTime}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="lastModifiedDateTime"
                    name="lastModifiedDateTime"
                    label="Last Modified Date Time"
                    size="small"
                    inputProps={{ readOnly: true }}
                    disabled={params.mode === "delete" ?true:false}
                    //   error={!!touched.lastModifiedDateTime && !!errors.lastModifiedDateTime}
                    //   helperText={touched.lastModifiedDateTime && errors.lastModifiedDateTime}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="createdBy"
                    name="createdBy"
                    label="Created By"
                    size="small"
                    inputProps={{ readOnly: true }}
                    disabled={params.mode === "delete" ?true:false}
                    //   error={!!touched.createdBy && !!errors.createdBy}
                    //   helperText={touched.createdBy && errors.createdBy}
                  />
                  {/* <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="lstcnttm"
                    name="lstcnttm"
                    label="LSTCNTTM"
                    size="small"
                    inputProps={{ readOnly: true }}
                    //   error={!!touched.lstcnttm && !!errors.lstcnttm}
                    //   helperText={touched.lstcnttm && errors.lstcnttm}
                  /> */}
                </Stack>
                <Stack sx={{ gridColumn: "span 1" }} direction="column" gap={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="comments"
                    name="comments"
                    label="comments"
                    size="small"
                    multiline
                    rows={2}
                    disabled={params.mode === "delete" ?true:false}
                    //   error={!!touched.comments1 && !!errors.comments1}
                    //   helperText={touched.comments1 && errors.comments1}
                  />
                  {/* <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="comments2"
                    name="comments2"
                    label="comments 2"
                    size="small"
                    //   error={!!touched.comments2 && !!errors.comments2}
                    //   helperText={touched.comments2 && errors.comments2}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="comments3"
                    name="comments3"
                    label="comments 3"
                    size="small"
                    //   error={!!touched.comments3 && !!errors.comments3}
                    //   helperText={touched.comments3 && errors.comments3}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="comments4"
                    name="comments4"
                    label="comments 4"
                    size="small"
                    //   error={!!touched.comments4 && !!errors.comments4}
                    //   helperText={touched.comments4 && errors.comments4}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="comments5"
                    name="comments5"
                    label="comments 5"
                    size="small"
                    //   error={!!touched.comments5 && !!errors.comments5}
                    //   helperText={touched.comments5 && errors.comments5}
                  /> */}
                </Stack>
              </Box>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 3",
                  },
                  padding: "5px",
                }}
              >
                <Stack
                  sx={{ gridColumn: "span 1" }}
                  direction={"column"}
                  gap={1}
                >
                  <Stack
                    direction="row"
                    justifyContent={"space-around"}
                    height={44}
                  >
                    <Typography variant="h6">Include</Typography>
                    <Typography variant="h6">Exclude</Typography>
                  </Stack>

                  {/* BRAND */}
                  <Stack direction="row" gap={1}>
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="brandInclude"
                      name="brandInclude"
                      options={brand}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.brand}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.brand}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Brand" />
                      )}
                    />
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="brandExclude"
                      name="brandExclude"
                      options={brand}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.brand}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.brand}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Brand" />
                      )}
                    />
                  </Stack>

                  {/* COMMODITY */}
                  <Stack direction="row" gap={1}>
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="commadityInClude"
                      name="commadityInClude"
                      options={comCat}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.comCat}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.comCat}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Commadity" />
                      )}
                    />
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="commadityExclude"
                      name="commadityExclude"
                      options={comCat}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.comCat}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.comCat}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Commadity" />
                      )}
                    />
                  </Stack>

                  {/* ALTERNATIVE CLASS */}
                  <Stack direction="row" gap={1}>
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="alternativeClassInclude"
                      name="alternativeClassInclude"
                      options={altClass}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.altClass}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.altClass}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Alternative Class" />
                      )}
                    />
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="alternativeClassExclude"
                      name="alternativeClassExclude"
                      options={altClass}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.altClass}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.altClass}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Alternative Class" />
                      )}
                    />
                  </Stack>

                  {/* VENDOR */}
                  <Stack direction="row" gap={1}>
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="vendorInclude"
                      name="vendorInclude"
                      options={vendor}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.vendor}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.vendor}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Vendor" />
                      )}
                    />
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="vendorExclude"
                      name="vendorExclude"
                      options={vendor}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.vendor}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.vendor}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Vendor" />
                      )}
                    />
                  </Stack>

                  {/* FRESH/FROZEN */}
                  <Stack direction="row" gap={1}>
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="freshfrozenInclude"
                      name="freshfrozenInclude"
                      options={fsfz}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.fsfz}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.fsfz}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Fresh/frozen" />
                      )}
                    />

                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="freshfrozenExclude"
                      name="freshfrozenExclude"
                      options={fsfz}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.fsfz}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.fsfz}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Fresh/frozen" />
                      )}
                    />
                  </Stack>

                  {/* SECONDARY CLASS */}
                  <Stack direction="row" gap={1}>
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="secondaryClassInclude"
                      name="secondaryClassInclude"
                      options={secondaryClass}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.secondaryClass}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.secondaryClass}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Secondary Class" />
                      )}
                    />
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="secondaryClassExclude"
                      name="secondaryClassExclude"
                      options={secondaryClass}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.secondaryClass}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.secondaryClass}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Secondary Class" />
                      )}
                    />
                  </Stack>

                  {/* CLASS ID */}
                  <Stack direction="row" gap={1}>
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="classIDInclude"
                      name="classIDInclude"
                      options={classId}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.classId}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.classId}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="ClassID" />
                      )}
                    />
                    <Autocomplete
                     disabled={params.mode === "delete" ?true:false}
                      size="small"
                      limitTags={1}
                      fullWidth
                      multiple
                      id="classIDExclude"
                      name="classIDExclude"
                      options={classId}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.classId}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li  key={key} {...optionProps} style={{ height: 30 ,display:'flex',margin:0,padding:0,fontSize:'12px'}}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                            />
                            {option.classId}
                          </li>
                        );
                      }}
                      sx={{ gridColumn: "span 1" }}
                      renderInput={(params) => (
                        <TextField {...params} label="ClassID" />
                      )}
                    />
                  </Stack>

                  <Stack justifyContent="flex-end" direction={"row"} gap={1}>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      startIcon={<CheckIcon size="small" />}
                      disabled={params.mode === "delete" ?true:false}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      startIcon={<ClearIcon size="small" />}
                      disabled={params.mode === "delete" ?true:false}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    height: 400,
                    gridColumn: "span 2",
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
                    rowHeight={dataGridRowHeight}
                    rows={rows}
                    columns={columns}
                    // checkboxSelection
                    // disableSelectionOnClick
                    // disableRowSelectionOnClick
                    getRowId={(row) => row.item_key}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 20 } },
                    }}
                    pageSizeOptions={[5, 10, 20, 25]}
                    columnVisibilityModel={{
                      item_key: false,
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
              </Box>
            </Paper>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default PriceListEdit;

const brand = [
  { brand: "Niman Ranch", id: 4854 },
  { brand: "Aidells Sausage", id: 5986 },
  { brand: "Ball Park", id: 4855 },
  { brand: "Bar-S Foods", id: 2854 },
];

const comCat = [
  { comCat: "Other Items", id: 4854 },
  { comCat: "Vanguard Items", id: 3423 },
  { comCat: "Pork Items", id: 5986 },
  { comCat: "Program Items", id: 4855 },
  { comCat: "Seafood Items", id: 2854 },
];

const altClass = [
  { altClass: "SAMPLE", id: 4854 },
  { altClass: "PPC", id: 5986 },
  { altClass: "CHICKENFRS", id: 4855 },
  { altClass: "PTR", id: 2854 },
];

const vendor = [
  { vendor: "Country Natural Beef", id: 4854 },
  { vendor: "E & E Foods", id: 5986 },
  { vendor: "Meyer Foods Group LLC", id: 4855 },
  { vendor: "Seaboard Foods", id: 2854 },
];

const fsfz = [
  { fsfz: "Dry", id: 4854 },
  { fsfz: "Frozen", id: 5986 },
  { fsfz: "Fresh", id: 4855 },
];

const classId = [
  { classId: "Seafood, Frozen", id: 4854 },
  { classId: "Chicken, Fresh", id: 5986 },
  { classId: "Lamb, Fresh", id: 4855 },
  { classId: "Chicken, Frozen", id: 2854 },
];

const secondaryClass = [
  { secondaryClass: "Spareribs", id: 4854 },
  { secondaryClass: "Neckbones - Raw", id: 5986 },
  { secondaryClass: "Butts - Boneless", id: 4855 },
  { secondaryClass: "Ham - Gift", id: 2854 },
];

const itemDescription = [
  { itemDescription: "1283 Tenders", id: 4854 },
  { itemDescription: "78956 Flat Meat", id: 5986 },
  { itemDescription: "784666 Jarritos", id: 4855 },
];

const buyer = [
  {
    ITEM_KEY: 253,
    ITEM_BUYER: "scott",
  },
  {
    ITEM_KEY: 257,
    ITEM_BUYER: "Other",
  },
  {
    ITEM_KEY: 258,
    ITEM_BUYER: "smatson",
  },
  {
    ITEM_KEY: 259,
    ITEM_BUYER: "house",
  },
  {
    ITEM_KEY: 260,
    ITEM_BUYER: "bhart",
  },
  {
    ITEM_KEY: 261,
    ITEM_BUYER: "lbaskett",
  },
  {
    ITEM_KEY: 262,
    ITEM_BUYER: "Jared.Mitchell",
  },
];

const majarGroup = [
  {
    ppc_PriceListID: "GOATS",
    ppc_MajorListGroup: "BEEF",
  },
  {
    ppc_PriceListID: "MBA",
    ppc_MajorListGroup: "CHICKN",
  },
  {
    ppc_PriceListID: "SHMPPD",
    ppc_MajorListGroup: "SEAFD",
  },
  {
    ppc_PriceListID: "SHMPEZ",
    ppc_MajorListGroup: "SEAFD",
  },
  {
    ppc_PriceListID: "MISCSF",
    ppc_MajorListGroup: "SEAFD",
  },
  {
    ppc_PriceListID: "DRAP2D",
    ppc_MajorListGroup: "DRAPER",
  },
  {
    ppc_PriceListID: "GLENW",
    ppc_MajorListGroup: "NEW",
  },
  {
    ppc_PriceListID: "FARM",
    ppc_MajorListGroup: "NEW",
  },
  {
    ppc_PriceListID: "DELSOL",
    ppc_MajorListGroup: "DRY",
  },
  {
    ppc_PriceListID: "FRNKFS",
    ppc_MajorListGroup: "PORK",
  },
];
