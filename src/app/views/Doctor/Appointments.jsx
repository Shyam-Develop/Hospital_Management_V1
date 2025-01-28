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
const Appointments = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const naviate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    { headerName: "Rec ID",
        field: "rec_id",
        width: "150",
        align: "left",
        headerAlign: "left",
        hide: false,
    },
    {
      headerName: "Patient ID",
      field: "patient_id",
      width: "100",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Appointment ID",
      field: "appointment_id",
      width: "170",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "First Name",
      field: "first_name",
      width: "150",
      align: "right",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Last Name",
      field: "last_name",
      width: "150",
      align: "right",
      headerAlign: "center",
      hide: true,
    },
    {
      headerName: "Gender",
      field: "gender",
      width: "170",
      align: "right",
      headerAlign: "center",
      hide: true,
    },
    {
      headerName: "Email",
      field: "email",
      width: "170",
      align: "left",
      headerAlign: "center",
      hide: true,
    },
    {
        headerName: "Contact",
        field: "contact",
        width: "170",
        align: "left",
        headerAlign: "center",
        hide: true,
      },
      {
        headerName: "Appointment Date",
        field: "appointment_date",
        width: "170",
        align: "left",
        headerAlign: "center",
        hide: true,
      },
      {
        headerName: "Appointment Time",
        field: "appointment_time",
        width: "170",
        align: "left",
        headerAlign: "center",
        hide: true,
      },
      {
        headerName: "Current Status",
        field: "current_status",
        width: "170",
        align: "right",
        headerAlign: "center",
        hide: true,
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
              startIcon={<Add color="primary" size="small" />}
              onClick={() => {}}
            >
              Prescription
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
        rec_id: "1",
        patient_id: "17",
        appointment_id: "16",
        first_name: "abi",
        last_name: "kumar",
        gender: "male",
        email: "mughesh2001@gmail.com",
        contact: "8248517047",
        appointment_date: "2024-12-11",
        appointment_time: "14:00:00",
        current_status: "Active"

    },
    { rec_id: "2",
        patient_id: "18",
        appointment_id: "17",
        first_name: "madhan",
        last_name: "kumar",
        gender: "male",
        email: "sam2001@gmail.com",
        contact: "8248517049",
        appointment_date: "2024-12-12",
        appointment_time: "10:00:00",
        current_status: "Active"
    },
    {
        rec_id: "3",
        patient_id: "19",
        appointment_id: "18",
        first_name: "lokesh",
        last_name: "kumar",
        gender: "male",
        email: "lokesh2001@gmail.com",
        contact: "8248517040",
        appointment_date: "2024-12-27",
        appointment_time: "16:00:00",
        current_status: "Cancelled by pateint"
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
          padding: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
            paddingX: 1,
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
          routeSegments={[{ name: "Appointments" }]}
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
            getRowId={(row) => row.rec_id}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[5, 10, 20, 25]}
            columnVisibilityModel={{
                doctorname: true,
                rec_id:false,
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

export default Appointments;
