import React, { useEffect } from "react";
import {
  IconButton,
  LinearProgress,
  Paper,
  Button,
  Box,
  Tooltip,
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
const RunGroup = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const navigate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    {
      headerName: "Run Group Code",
      field: "RunGroupCode",
      width: "170",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Run Group Name",
      field: "RunGroupName",
      width: "300",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Sort Order",
      field: "SortOrder",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Disable",
      field: "Disable",
      width: "170",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 200,
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
                navigate("/pages/run-group/run-group-getail/edit");
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
                navigate("/pages/run-group/run-group-getail/delete");
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
      RunGroupCode: "RG1001",
      RunGroupName: "SHEPARD",
      SortOrder: 1,
      Disable: "N",
    },
    {
      RunGroupCode: "RG1002",
      RunGroupName: "DAVE",
      SortOrder: 2,
      Disable: "N",
    },
    {
      RunGroupCode: "RG1003",
      RunGroupName: "BOB",
      SortOrder: 3,
      Disable: "N",
    },
    {
      RunGroupCode: "RG1004",
      RunGroupName: "CAYTIE",
      SortOrder: 4,
      Disable: "N",
    },
    {
      RunGroupCode: "RG1005",
      RunGroupName: "KRISTJAN",
      SortOrder: 5,
      Disable: "N",
    },
    {
      RunGroupCode: "RG1006",
      RunGroupName: "LEAH",
      SortOrder: 6,
      Disable: "N",
    },
    {
      RunGroupCode: "RG1007",
      RunGroupName: "TONY",
      SortOrder: 7,
      Disable: "N",
    },
    {
      RunGroupCode: "RG1008",
      RunGroupName: "PAC",
      SortOrder: 8,
      Disable: "N",
    },
    {
      RunGroupCode: "RG1009",
      RunGroupName: "SALES",
      SortOrder: 9,
      Disable: "N",
    },
    {
      RunGroupCode: "RG1010",
      RunGroupName: "HOSS",
      SortOrder: 10,
      Disable: "N",
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
              navigate("/pages/run-group/run-group-getail/add");
            }}
          >
            Add Run Group
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Price Book" }, { name: "Run Group" }]}
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
            getRowId={(row) => row.SortOrder}
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
      </Paper>
    </Container>
  );
};

export default RunGroup;
