import React from "react";
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

// ********************** ICONS ********************** //
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

// ********************* STYLED COMPONENTS ********************* //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

// ********************* ITEMS SCREEN LISTVIEW ********************* //
const User = () => {
  // ********************* HOOKS AND CONSTANTS ********************* //
  const theme = useTheme();
  const navigate = useNavigate();

  // ********************* LOCAL STATE ********************* //

  // ********************* REDUX STATE ********************* //

  // ********************* COLUMN AND ROWS ********************* //
  const columns = [
    {
      headerName: "User code",
      field: "User_code",
      width: "100",
      align: "right",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "User name",
      field: "User_name",
      width: "170",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Email",
      field: "Email",
      width: "300",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "User Company",
      field: "User_Company",
      width: "250",
      align: "left",
      headerAlign: "left",
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
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              sx={{ height: 25 }}
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                navigate("/pages/user/user-edit-detail/edit");
              }}
              startIcon={<ModeEditOutlineIcon size="small" />}
            >
              Edit
            </Button>

            <Button
              sx={{ height: 25}}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon color="error" size="small" />}
              onClick={() => {
                navigate("/pages/user/user-edit-detail/delete");
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
      User_code: 153,
      User_name: "RAM",
      Email: "ram123@gmail.com",
      User_Company: "plymouth",
    },
    {
      User_code: 160,
      User_name: "Shyam",
      Email: "shyam123@gmail.com",
      User_Company: "Nickey",
    },
    {
      User_code: 161,
      User_name: "Mani",
      Email: "mani123@gmail.com",
      User_Company: "S&J",
    },
  ];

  // ********************* TOOLBAR ********************* //
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
              navigate("/pages/user/user-edit-detail/add");
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
        <Breadcrumb routeSegments={[{ name: "Security" }, { name: "User" }]} />
      </div>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Box
         sx={{ 

          height: dataGridHeight, 

          "& .MuiDataGrid-root": { 

            border: "none", 

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

            color: "black !important", 

          }, 

          "& .MuiCheckbox-root.Mui-checked": { 

            color: "black !important", 

          }, 

          "& .MuiDataGrid-row:nth-of-type(even)": { 

            backgroundColor: theme.palette.action.hover, 

          }, 

          "& .MuiDataGrid-row:nth-of-type(odd)": { 

            backgroundColor: theme.palette.background.default, 

          }, 

          "& .MuiDataGrid-row.Mui-selected:hover": { 

            backgroundColor: `${theme.palette.action.selected} !important`, 

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
            getRowId={(row) => row.User_code}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[5, 10, 20, 25]}
            columnVisibilityModel={{
              User_code: true,
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

export default User;
