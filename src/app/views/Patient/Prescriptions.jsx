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
import { Add, Cancel } from "@mui/icons-material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import PaymentIcon from "@mui/icons-material/Payment";

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
const Prescriptions = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  // const navigate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    {
      headerName: "Rec ID",
      field: "rec_id",
      width: "50",
      align: "right",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Doctor Name",
      field: "doctorname",
      width: "150",
      align: "right",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Appointment ID",
      field: "appointment_id",
      width: "70",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Medicine ",
      field: "medicine",
      width: "70",
      align: "left",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Comments",
      field: "comments",
      width: "50",
      align: "left",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Dosage Days",
      field: "dosagedays",
      width: "50",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Before Breakfast Qty",
      field: "beforebreak",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "After Breakfast Qty",
      field: "afterbreak",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Before Lunch Qty",
      field: "beforebreak",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "After Lunch Qty",
      field: "afterlunch",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Before Dinner Qty",
      field: "beforedinner",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "After Dinner Qty",
      field: "afterdinner",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Total Qty",
      field: "total",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    // {
    //   field: "Action",
    //   headerName: "Action",
    //   minWidth: 200,
    //   flex: 1,
    //   sortable: false,
    //   headerAlign: "center",
    //   filterable: false,
    //   disableColumnMenu: true,
    //   disableExport: true,
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div>
    //         <Button
    //           sx={{ height: 25, marginLeft: 1 }}
    //           variant="contained"
    //           color="primary"
    //           size="small"
    //           startIcon={<PaymentIcon color="action" size="small" />}
    //           onClick={() => {}}
    //         >
    //           Pay Bill
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  const rows = [
    {
      rec_id: "1",
      doctorname: "Dinesh",
      appointment_id: "16",
      medicine: "2024-12-11",
      comments: "14:00:00",
      dosagedays: "Fever",
      beforebreak: "nill",
      afterbreak: "dolo650",
      afterlunch: "1",
      beforelunch: "1",
      beforedinner: "1",
      afterdinner: "1",
      total: "4",
    },
    {
      rec_id: "2",
      doctorname: "Dinesh K",
      appointment_id: "16",
      medicine: "2024-12-11",
      comments: "14:00:00",
      dosagedays: "Fever",
      beforebreak: "nill",
      afterbreak: "dolo650",
      afterlunch: "1",
      beforelunch: "1",
      beforedinner: "1",
      afterdinner: "1",
      total: "4",
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
          padding: 1,
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
        <Breadcrumb routeSegments={[{ name: "Prescriptions" }]} />
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

export default Prescriptions;
