import React from "react";
import {
  LinearProgress,
  Paper,
  Button,
  Box,
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

// ********************** ICONS ********************** //
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
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
const Patient = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const navigate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    {
      headerName: "First Name",
      field: "firstname",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Last Name",
      field: "lastname",
      width: "150",
      align: "left",
      headerAlign: "left",
      hide: false,
    },

    {
      headerName: "Email",
      field: "email",
      width: "170",
      align: "left",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Phone",
      field: "phone",
      width: "170",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Alternate Phone",
      field: "alternatephone",
      width: "170",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "DOB",
      field: "dateofbirth",
      width: "170",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "DOJ",
      field: "dateofjoining",
      width: "170",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 300,
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
                navigate("/admin/patient-edit");
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
      firstname: "Madhesh",
      lastname: "Kumar",
      globalid: "0098",
      email: "madhesh@gmail.com",
      phone: "8907655566",
      alternatephone: "9878985432",
      dateofbirth: "19-04-1999",
      dateofjoining: "12-01-2025",
    },
    {
      firstname: "Lokesh",
      lastname: "Paul",
      globalid: "0099",
      email: "lokesh@gmail.com",
      phone: "7765489023",
      alternatephone: "8890763452",
      dateofbirth: "20-08-1998",
      dateofjoining: "05-01-2025",
    },
    {
      firstname: "Dharma",
      lastname: "Durai",
      globalid: "0097",
      email: "durai@gmail.com",
      phone: "9089024561",
      alternatephone: "7612345676",
      dateofbirth: "09-06-1995",
      dateofjoining: "02-01-2025",
    },
  ];

  // ********************** TOOLBAR ********************** //
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end", // Align everything to the right
          width: "100%",
          padding: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GridToolbarQuickFilter />
          {/* Add Button next to the search box */}
          <Button
            sx={{ height: 25, marginLeft: 1 }}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon color="action" size="small" />}
            onClick={() => {
              navigate("/admin/patient-edit");
            }}
          >
            Add
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Patient" }]} />
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
            getRowId={(row) => row.firstname}
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

export default Patient;
