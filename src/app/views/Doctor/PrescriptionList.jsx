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
import EditIcon from "@mui/icons-material/Edit";


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
const PrescriptionList = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const navigate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    { headerName: "Rec ID",
        field: "rec_id",
        width: "100",
        align: "right",
        headerAlign: "left",
        hide: false,
    },
    {
      headerName: "Patient ID",
      field: "patient_id",
      width: "100",
      align: "right",
      headerAlign: "left",
      hide: true,
    },
  
    {
      headerName: "First Name",
      field: "first_name",
      width: "150",
      align: "right",
      headerAlign: "center",
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
        headerName: "Appointment ID",
        field: "appointment_id",
        width: "130",
        align: "left",
        headerAlign: "center",
        hide: true,
      },
      {
        headerName: "Appointment date",
        field: "appointment_date",
        width: "130",
        align: "right",
        headerAlign: "center",
        hide: true,
      },
      {
        headerName: "Appointment time",
        field: "appointment_time",
        width: "130",
        align: "right",
        headerAlign: "center",
        hide: true,
      },
      {
        headerName: " Disease",
        field: "disease",
        width: "130",
        align: "left",
        headerAlign: "center",
        hide: true,
      },
      {
        headerName: "Allergy",
        field: "allergy",
        width: "150",
        align: "left",
        headerAlign: "center",
        hide: true,
      },
      {
        headerName: "Prescribe",
        field: "prescribe",
        width: "130",
        align: "left",
        headerAlign: "center",
        hide: true,
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
              sx={{ height: 25, marginLeft: 1 }}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<EditIcon color="action" size="small" />}
              onClick={() => {
                navigate("/doctor/prescriptionedit");
              }}
            >
              Edit
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
        first_name: "madhan",
        last_name: "kumar",
        appointment_id: "16",
        appointment_date: "2024-12-11",
        appointment_time: "14:00:00",
        disease: "fever",
        allergy: "nill",
        prescribe: "dolo650",
    },
    { 
       rec_id: "2",
      patient_id: "18",
      first_name: "madhan",
      last_name: "kumar",
      appointment_id: "17",
      appointment_date: "2024-12-14",
      appointment_time: "10:00:00",
      disease: "headache",
      allergy: "nill",
      prescribe: "combiflam plus",
    },
    {
      rec_id: "3",
      patient_id: "19",
      first_name: "madhan",
      last_name: "kumar",
      appointment_id: "18",
      appointment_date: "2024-12-27",
      appointment_time: "09:00:00",
      disease: "cough",
      allergy: "nill",
      prescribe: "cofsils",
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
          routeSegments={[{ name: "Prescription List" }]}
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
                patient_id:false,

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

export default PrescriptionList;
