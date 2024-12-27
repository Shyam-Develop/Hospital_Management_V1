import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Tooltip,
  Typography,
  styled,
  useTheme,
  FormControlLabel,
  Checkbox,
  Stack,
  Button,
} from "@mui/material";

import { Breadcrumb, SimpleCard } from "app/components";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { themeColors } from "app/components/baseTheme/themeColors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getLocalListview } from "app/redux/slice/listviewSlice";
// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
//=================================COLUMNS AND ROWS==========================================//
const columns = [
  { field: "Customer_Name", headerName: "Customer Name", width: 300 },
  { 
    field: "info", 
    headerName: "Customer Info", 
    flex:1 , 
    valueGetter: (value, row) => "see Details"
  },
];
const rows = [
  { id: 1, customer: "Acme Poultry", info: "see Details" },
  { id: 2, customer: "Alaska Sea Pack", info: "see Details" },
  { id: 3, customer: "Asian Pacific Market", info: "see Details" },
  { id: 4, customer: "Azteca", info: "see Details" },
  { id: 5, customer: "Aloha Produce", info: "see Details" },
  { id: 6, customer: "B&D Foods", info: "see Details" },
  { id: 7, customer: "Coro Foods", info: "see Details" },
  { id: 8, customer: "Green Valley Farms", info: "see Details" },
  { id: 9, customer: "Blue Wave Seafoods", info: "see Details" },
  { id: 10, customer: "Sunrise Distributors", info: "see Details" },
  { id: 11, customer: "Sunrise Distributors", info: "see Details" },
  { id: 12, customer: "Sunrise Distributors", info: "see Details" },
  { id: 13, customer: "Sunrise Distributors", info: "see Details" },
  { id: 14, customer: "Sunrise Distributors", info: "see Details" },
  { id: 15, customer: "Sunrise Distributors", info: "see Details" },
];




export default function ViewDirectory() {

  // const themeColors=useTheme();
  const colors = themeColors;

  //=================================TOOLBAR=====================================//
  function secondaryCustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",

              bgcolor: "#174c4f",
              width: "100%",
              mb: 4,
            }}
          >
            <GridToolbarQuickFilter
              sx={{
                input: {
                  color: "white",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Center horizontally
                flex: "1",
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                Directory
              </Typography>
            </Box>
          </Box>
        </Box>
      </GridToolbarContainer>
    );
  }

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    const customerId = params.row.id;
    const name = params.row.customer;
    navigate(`/pages/view-directory/customer-info`, {
      state: { customerId, name },
    });
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLocalListview({ url: "/api/pricebook/get-customer-list" }));
  },[])

  const isLoading = useSelector((state) => state.listview.loading);
  console.log("🚀 ~ ViewDirectory ~ isLoading:", isLoading)
const status = useSelector((state) => state.listview.status);
const rowsLocal = useSelector((state) => state.listview.listviewRowData);
  console.log("🚀 ~ ViewDirectory ~ rowsLocal:", rowsLocal)
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Price Book Directory" },
            { name: "View Directory" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <Box
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: "black",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blue.palette.info.main,
                color: colors.blue.palette.info.contrastText,
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.blueDark.palette.info.main,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blue.palette.info.main,
                color: colors.blue.palette.info.contrastText,
              },
              "& .MuiCheckbox-root": {
                color: "primary",
              },
            }}
          >
            <DataGrid
              sx={{ height: "550px" }}
              slots={{
                loadingOverlay: LinearProgress,
                // toolbar: secondaryCustomToolbar,
              }}
              rows={rowsLocal}
              columns={columns}
              loading={isLoading}
              disableSelectionOnClick
              getRowId={(row) => row.id}
              onRowClick={handleRowClick}
              initialState={{
                pagination: { paginationModel: { pageSize: 15 } },
              }}
              pageSizeOptions={[5, 10, 15, 25]}
              columnVisibilityModel={{
                RecordID: false,
                SortOrder: false,
                CreatedDateTime: false,
                ImgApp: false,
                Sap: false,
                Contact: false,
              }}
              // disableColumnFilter
              // disableColumnSelector
              // disableDensitySelector
              rowHeight={30}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </Box>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
