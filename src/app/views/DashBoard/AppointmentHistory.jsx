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
import { Add, Cancel, Edit } from "@mui/icons-material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

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
const AppointmentHistory = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const naviate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    {
      headerName: "ID",
      field: "id",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Doctor Name",
      field: "doctorname",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Consultancy Fees",
      field: "fees",
      width: "150",
      align: "right",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Appointment Date",
      field: "date",
      width: "170",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Appointment Time",
      field: "time",
      width: "170",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Current Status",
      field: "status",
      width: "170",
      align: "left",
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
              sx={{ height: 25, marginLeft: 1 }}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<Edit color="primary" size="small" />}
              onClick={() => {}}
            >
              Modify
            </Button>
            <Button
              sx={{ height: 25, marginLeft: 1 }}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<Add color="primary" size="small" />}
              onClick={() => {}}
            >
              New
            </Button>
            <Button
              sx={{ height: 25, marginLeft: 1 }}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon color="error" size="small" />}
              onClick={() => {}}
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
      id: "1",
        doctorname: "Dinesh",
        fees: "700",
        date: "2024-12-17",
        time: "14:00:00",
        status: "Active",
    },
    {
      id: "2",
        doctorname: "Ashok",
        fees: "500",
        date: "2024-12-27",
        time: "12:00:00",
        status: "Active",
    },
    {
      id: "3",

        doctorname: "Suresh",
        fees: "500",
        date: "2024-12-11",
        time: "14:00:00",
        status: "Active",
    },
    {
      id: "4",

        doctorname: "Suresh",
        fees: "500",
        date: "2024-12-12",
        time: "10:00:00",
        status: "Active",
    },
    {
      id: "5",

        doctorname: "Suresh",
        fees: "500",
        date: "2024-12-27",
        time: "16:00:00",
        status: "Canecelled by you",
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
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Appointment History" }]}
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
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[5, 10, 20, 25]}
            columnVisibilityModel={{
                doctorname: true,
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

export default AppointmentHistory;
