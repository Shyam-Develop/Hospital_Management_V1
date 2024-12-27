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
import { useNavigate, useParams } from "react-router-dom";

// ********************** ICONS ********************** //
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Add } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { RefreshOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";

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
const RunGroupEdit = () => {
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
      headerName: "Customer Number",
      field: "CustomerNumber",
      width: "150",
      align: "left",
      headerAlign: "left",
    },
    {
      headerName: "Customer Name",
      field: "CustomerName",
      width: "200",
      align: "left",
      headerAlign: "left",
    },
    {
      headerName: "Address Code",
      field: "AddressCode",
      width: "200",
      align: "left",
      headerAlign: "left",
    },
    {
      headerName: "Location",
      field: "Location",
      width: "200",
      align: "left",
      headerAlign: "left",
    },
    {
      headerName: "Contact Name",
      field: "ContactName",
      width: "200",
      align: "left",
      headerAlign: "left",
    },
    {
      headerName: "Contact Email",
      field: "ContactEmail",
      width: "200",
      align: "left",
      headerAlign: "left",
    },
    {
      headerName: "Contact Phone",
      field: "Contact Phone",
      width: "200",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 100,
      flex: 1,
      sortable: false,
      headerAlign: "center",
      filterable: false,
      disableColumnMenu: true,
      disableExport: true,
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            sx={{ height: 25 }}
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon color="error" size="small" />}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const rows = [
    {
      CustomerNumber: 30200,
      CustomerName: "Alpine Food Distribution, Inc.",
      AddressCode: "PRIMARY",
      Location: "1017 S Boone Street",
      ContactName: "ELENA",
      ContactEmail: "",
      ContactPhone: "3.60703E+13",
    },
    {
      CustomerNumber: 30300,
      CustomerName: "Amarilis's Meat Market",
      AddressCode: "BILLING",
      Location: "1501 N Miller St",
      ContactName: "Dan Carr",
      ContactEmail: "",
      ContactPhone: "5.09889E+13",
    },
  ];

  const autoComplete = [
    {
      CustomerNumber: 30200,
      CustomerName: "Alpine Food Distribution, Inc.",
      AddressCode: "PRIMARY",
      Location: "1017 S Boone Street",
      ContactName: "ELENA",
      ContactEmail: "",
      ContactPhone: "3.60703E+13",
    },
    {
      CustomerNumber: 30300,
      CustomerName: "Amarilis's Meat Market",
      AddressCode: "BILLING",
      Location: "1501 N Miller St",
      ContactName: "Dan Carr",
      ContactEmail: "",
      ContactPhone: "5.09889E+13",
    },
    {
      CustomerNumber: 1020730,
      CustomerName: "Sea Wolf Adventures",
      AddressCode: "NUSA",
      Location: "PO Box 312",
      ContactName: "Kimberly Owen",
      ContactEmail: "",
      ContactPhone: "9.07957E+13",
    },
    {
      CustomerNumber: 40100,
      CustomerName: "Bahm, Sydney",
      AddressCode: "999",
      Location: "Vendor #31729-01",
      ContactName: "Greg Thompson",
      ContactEmail: "",
      ContactPhone: "4.25314E+13",
    },
    {
      CustomerNumber: 40125,
      CustomerName: "Baileys IGA",
      AddressCode: "1",
      Location: "10333 Highway 12 SW",
      ContactName: "Larry Gueman",
      ContactEmail: "",
      ContactPhone: "3.60274E+13",
    },
    {
      CustomerNumber: 401400,
      CustomerName: "Barco, Adriana",
      AddressCode: "12",
      Location: "4905 Road 68",
      ContactName: "Meat Dept: Alberto",
      ContactEmail: "",
      ContactPhone: "5.09546E+13",
    },
    {
      CustomerNumber: 30350,
      CustomerName: "BBQ2U",
      AddressCode: "TONY",
      Location: "759 S 74th Place",
      ContactName: "",
      ContactEmail: "",
      ContactPhone: "8.77691E+13",
    },
    {
      CustomerNumber: 30450,
      CustomerName: "BB Ranch Butcher Shop",
      AddressCode: "MAIN",
      Location: "12637 NE Woodinville Dr",
      ContactName: 'Rauldel "Gizmo" Calderon',
      ContactEmail: "",
      ContactPhone: "4.25487E+13",
    },
    {
      CustomerNumber: 34057,
      CustomerName: "Aldrich's",
      AddressCode: "BILLING",
      Location: "940 Lawrence Street",
      ContactName: "Yos Ligtenberg",
      ContactEmail: "",
      ContactPhone: "3.60385E+13",
    },
    {
      CustomerNumber: 34058,
      CustomerName: "Alderwood Eggs",
      AddressCode: "BILLING",
      Location: "21126 44th Ave W",
      ContactName: "Hussain Al Mtow Aq",
      ContactEmail: "",
      ContactPhone: "4.25346E+13",
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
            flexDirection: isNonMobile ? "row" : "column",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            paddingX: 2,
            width: "100%",
          }}
        >
          <GridToolbarQuickFilter sx={{ width: 700 }} />
          <Autocomplete
            fullWidth
            disablePortal
            variant="outlined"
            type="text"
            id="customer"
            name="customer"
            size="small"
            options={autoComplete}
            getOptionLabel={(option) => option.CustomerName}
            renderInput={(params) => <TextField {...params} label="Customer" />}
          />
          <Autocomplete
            fullWidth
            disablePortal
            options={autoComplete}
            getOptionLabel={(option) => option.AddressCode}
            variant="outlined"
            type="text"
            id="address"
            name="address"
            size="small"
            renderInput={(params) => <TextField {...params} label="Address" />}
          />
          <Autocomplete
            fullWidth
            disablePortal
            options={autoComplete}
            getOptionLabel={(option) => option.ContactName}
            variant="outlined"
            type="text"
            id="contact"
            name="contact"
            size="small"
            renderInput={(params) => <TextField {...params} label="Contact" />}
          />
          <Button
            variant="contained"
            color="info"
            size="small"
            sx={{ width: 300 }}
            startIcon={<RefreshOutlined fontSize="small" />}
            onClick={() => toast.error("Under construction...")}
            disabled={params.mode === "delete" ?true:false}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => {
              console.log("Creating Price List...");
            }}
            startIcon={<Add fontSize="small" />}
            disabled={params.mode === "delete" ?true:false}
          >
            Add
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <Formik
        initialValues={{
          runGroupCode: "",
          runGroupName: "",
          sortOrder: "",
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
                  { name: "Run Group", path: "/pages/run-group" },
                  { name: `${params.mode} Run Group` },
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
                >
                  {params.mode === "delete" ? "Confirm" : "Save"}
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={<ArrowBackIcon size="small" />}
                  onClick={() => navigate("/pages/customer-price-lists")}
                >
                  Back To Customer Price Lists
                </Button>

                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={<ArrowBackIcon size="small" />}
                  onClick={() => navigate("/pages/run-group")}
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
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  id="runGroupCode"
                  name="runGroupCode"
                  label="Run Group Code"
                  required
                  InputLabelProps={{
                    sx: { "& .MuiInputLabel-asterisk": { color: "red" } },
                  }}
                  size="small"
                  sx={{ gridColumn: "span 1" }}
                  disabled={params.mode === "delete" ?true:false}
                  //   error={!!touched.runGroupCode && !!errors.runGroupCode}
                  //   helperText={touched.runGroupCode && errors.runGroupCode}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  id="runGroupName"
                  name="runGroupName"
                  label="Run Group Name"
                  size="small"
                  sx={{ gridColumn: "span 1" }}
                  disabled={params.mode === "delete" ?true:false}
                  //   error={!!touched.runGroupName && !!errors.runGroupName}
                  //   helperText={touched.runGroupName && errors.runGroupName}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  id="sortOrder"
                  name="sortOrder"
                  label="Sort Order"
                  size="small"
                  sx={{ gridColumn: "span 1" }}
                  disabled={params.mode === "delete" ?true:false}
                  //   error={!!touched.sortOrder && !!errors.sortOrder}
                  //   helperText={touched.sortOrder && errors.sortOrder}
                />

                <Box
                  sx={{
                    height: 400,
                    gridColumn: "span 4",
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
                    disableSelectionOnClick
                    disableRowSelectionOnClick
                    getRowId={(row) => row.CustomerNumber}
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

export default RunGroupEdit;

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
