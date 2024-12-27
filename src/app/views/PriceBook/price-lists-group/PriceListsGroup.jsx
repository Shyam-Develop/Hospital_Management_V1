import React, { useEffect } from "react";
import {
  IconButton,
  LinearProgress,
  Paper,
  Tooltip,
  Button,
  Box,
  styled,
  useTheme,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { dataGridHeight, dataGridRowHeight } from "app/utils/constant";

// ********************** ICONS ********************** //
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
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
const PriceListsGroup = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const naviate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    {
      headerName: "Group Code",
      field: "GroupCode",
      width: "170",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Group Name",
      field: "GroupName",
      width: "300",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Sort Order",
      field: "sortOrder",
      width: "170",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Disable",
      field: "disable",
      width: "200",
      align: "center",
      headerAlign: "center",
      hide: false,
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 400,
      flex: 1,
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
                  "/pages/price-lists-group/price-lists-group-detail/edit"
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
                naviate("/pages/price-lists-group/price-lists-group-detail/delete");
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      GroupCode: "TURKEY",
      GroupName: "Turkey",
      CustomerNumber: 34947,
      CustomerAddressCode: 0,
      disable:"N",
      sortOrder:1
    },
    {
      GroupCode: "SVCDEL",
      GroupName: "Service Deli Guide",
      CustomerNumber: 594753,
      CustomerAddressCode: 0,
      disable:"N",
      sortOrder:2
    },
    {
      GroupCode: "SEAFD",
      GroupName: "Seafood",
      CustomerNumber: 34297,
      CustomerAddressCode: 1,
      disable:"N",
      sortOrder:3
    },
    {
      GroupCode: "RES1",
      GroupName: "BEEF / RES",
      CustomerNumber: 92154,
      CustomerAddressCode: 0,
      disable:"N",
      sortOrder:4
    },
    {
      GroupCode: "PORK",
      GroupName: "Pork",
      CustomerNumber: 382113,
      CustomerAddressCode: 0,
      disable:"N",
      sortOrder:5
    },
    {
      GroupCode: "POLLO1",
      GroupName: "CHICKEN/POLLO",
      CustomerNumber: 382190,
      CustomerAddressCode: "BILLING",
      disable:"N",
      sortOrder:6
    },
    {
      GroupCode: "NEW1",
      GroupName: "Smithfield Further Processed",
      CustomerNumber: 382190,
      CustomerAddressCode: "MAIN",
      disable:"N",
      sortOrder:7
    },
    {
      GroupCode: "NEW",
      GroupName: "Processed Meat Guide",
      CustomerNumber: 180454,
      CustomerAddressCode: 0,
      disable:"N",
      sortOrder:8
    },
    {
      GroupCode: "MARIS1",
      GroupName: "SEAFOOD / MARISCOS",
      CustomerNumber: 60105,
      CustomerAddressCode: 5,
      disable:"N",
      sortOrder:9
    },
    {
      GroupCode: "MANTEC",
      GroupName: "MANTECA Y ACEITES",
      CustomerNumber: 412053,
      CustomerAddressCode: 999,
      disable:"N",
      sortOrder:10
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
              naviate("/pages/price-lists-group/price-lists-group-detail/add");
            }}
          >
            Add Print Group
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
            { name: "Print Group" },
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
            getRowId={(row) => row.sortOrder}
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
            disableSelectionOnClick
            disableRowSelectionOnClick  
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default PriceListsGroup;
