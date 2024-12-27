import React, { useEffect } from "react";
import {
  Box,
  LinearProgress,
  Paper,
  Button,
  styled,
  useTheme,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { dataGridHeight, dataGridRowHeight } from "app/utils/constant";
import { Add, AddAlertOutlined, RefreshOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

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
const CustomerPriceLists = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const naviate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    {
      headerName: "Customer Number ",
      field: "CustomerNumber",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Customer Name",
      field: "CustomerName",
      width: "150",
      align: "Right",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Location",
      field: "Location",
      width: "150",
      align: "Right",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Address Code",
      field: "AddressCode",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Contact Name",
      field: "ContactName",
      width: "150",
      align: "Right",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Contact Email",
      field: "ContactEmail",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Contact Phone",
      field: "ContactPhone",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      field: "Actions",
      headerName: "Action",
      minWidth: 450,
      sortable: false,
      headerAlign: "center",
      filterable: false,
      disableColumnMenu: true,
      disableExport: true,
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            <Button
              sx={{ height: 25 }}
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                naviate(
                  "/pages/customer-price-lists/customer-price-lists-detail/edit"
                );
              }}
              startIcon={<ModeEditOutlineIcon size="small" />}
            >
              Edit
            </Button>

            <Button
              sx={{ height: 25, marginLeft: 1 }}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon color="error" size="small" />}
              onClick={() => {
                naviate(
                  "/pages/customer-price-lists/customer-price-lists-detail/delete"
                );
              }}
            >
              Delete
            </Button>

            <Button
              sx={{ height: 25, marginLeft: 1 }}
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                naviate(
                  "/pages/customer-price-lists/customer-price-lists-detail/:mode/ppb-customer-items"
                );
              }}
              startIcon={<VisibilityIcon size="small" />}
            >
              Preview Items
            </Button>
          </div>
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
      ContactEmail: "alp@gmail.com",
      ContactPhone: "88776655110055",
    },
    {
      CustomerNumber: 30300,
      CustomerName: "Amarilis's Meat Market",
      AddressCode: "BILLING",
      Location: "1501 N Miller St",
      ContactName: "Dan Carr",
      ContactEmail: "amar@gmail.com",
      ContactPhone: "88778855110055",
    },
    {
      CustomerNumber: 1020730,
      CustomerName: "Sea Wolf Adventures",
      AddressCode: "NUSA",
      Location: "PO Box 312",
      ContactName: "Kimberly Owen",
      ContactEmail: "seat@gmail.com",
      ContactPhone: "99006655110055",
    },
    {
      CustomerNumber: 40100,
      CustomerName: "Bahm, Sydney",
      AddressCode: "999",
      Location: "Vendor #31729-01",
      ContactName: "Greg Thompson",
      ContactEmail: "bham@gmail.com",
      ContactPhone: "55776655110033",
    },
    {
      CustomerNumber: 40125,
      CustomerName: "Baileys IGA",
      AddressCode: "1",
      Location: "10333 Highway 12 SW",
      ContactName: "Larry Gueman",
      ContactEmail: "Bail@gmail.com",
      ContactPhone: "66776655110011",
    },
    {
      CustomerNumber: 401400,
      CustomerName: "Barco, Adriana",
      AddressCode: "12",
      Location: "4905 Road 68",
      ContactName: "Meat Dept: Alberto",
      ContactEmail: "Barco@gmail.com",
      ContactPhone: "66446655110020",
    },
    {
      CustomerNumber: 30350,
      CustomerName: "BBQ2U",
      AddressCode: "TONY",
      Location: "759 S 74th Place",
      ContactName: "",
      ContactEmail: "BBQ@gmail.com",
      ContactPhone: "15246655110032",
    },
    {
      CustomerNumber: 30450,
      CustomerName: "BB Ranch Butcher Shop",
      AddressCode: "MAIN",
      Location: "12637 NE Woodinville Dr",
      ContactName: 'Rauldel "Gizmo" Calderon',
      ContactEmail: "Barance@gmail.com",
      ContactPhone: "22336655110015",
    },
    {
      CustomerNumber: 34057,
      CustomerName: "Aldrich's",
      AddressCode: "BILLING",
      Location: "940 Lawrence Street",
      ContactName: "Yos Ligtenberg",
      ContactEmail: "aldrich@gmail.com",
      ContactPhone: "65326655110024",
    },
    {
      CustomerNumber: 34058,
      CustomerName: "Alderwood Eggs",
      AddressCode: "BILLING",
      Location: "21126 44th Ave W",
      ContactName: "Hussain Al Mtow Aq",
      ContactEmail: "alderwood@gmail.com",
      ContactPhone: "22558866551100",
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
          padding: 2,
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
          }}
        >
          <GridToolbarQuickFilter />

          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<Add />}
            onClick={() => {
              naviate(
                "/pages/customer-price-lists/customer-price-lists-detail/add"
              );
            }}
          >
            Add Customer Price Lists
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => {
              naviate("/pages/run-group/run-group-getail/add");
            }}
          >
            Create Run Group
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Price Book" },
            { name: "Customer Price Lists" },
          ]}
        />
      </div>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Box
          sx={{
            height: dataGridHeight,
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
            checkboxSelection
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
            rowSelectionModel={[30200,30300]}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default CustomerPriceLists;
