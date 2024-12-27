import React from "react";
import {
  Box,
  LinearProgress,
  Paper,
  Button,
  styled,
  useTheme,
  Stack,
  TextField,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { dataGridHeight, dataGridRowHeight } from "app/utils/constant";

// ********************** ICONS ********************** //
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";

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
const CompanyAccess = () => {
  // ********************* HOOKS AND CONSTANTS ********************* //
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();

  // ********************* LOCAL STATE ********************* //

  // ********************* REDUX STATE ********************* //

  // ********************* COLUMN AND ROWS ********************* //
  const columns = [
    {
      headerName: "Company code",
      field: "company_code",
      width: "200",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Company Name",
      field: "company_name",
      width: "250",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    // {
    //   headerName: "Email",
    //   field: "Email",
    //   width: "300",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: true,
    // },
    // {
    //   headerName: "User Company",
    //   field: "User_Company",
    //   width: "250",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: true,
    // },
  ];

  const rows = [
    {
      recid: 1,
      company_code: "PLY",
      company_name: "Plymouth",
    },
    {
      recid: 2,
      company_code: "S&J",
      company_name: "S and J",
    },
    {
      recid: 3,
      company_code: "NU",
      company_name: "Nicky",
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

          {/* <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<Add />}
            onClick={() => {
              navigate("/pages/user/user-edit-detail/add");
            }}
          >
            Add
          </Button> */}
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Security" },
            { name: "User", path: "/pages/user" },
            { name: `${params.mode} Company Access` },
          ]}
        />
        <Stack direction="row" gap={1} justifyContent="flex-end">
          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={
              params.mode === "delete" ? (
                <DeleteIcon color="error" size="small" />
              ) : (
                <SaveIcon size="small" />
              )
            }
            type="submit"
            //   disabled={isSubmitting}
          >
            {params.mode === "delete" ? "Confirm" : "Save"}
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<ArrowBackIcon size="small" />}
            onClick={() => navigate("/pages/user-group")}
          >
            Back
          </Button>
        </Stack>
      </div>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Box display="flex" flexDirection="row" gap={1}
        sx={{
            padding:1
        }}>
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            id="code"
            name="code"
            label="Code"
            size="small"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            id="name"
            name="name"
            label="Name"
            size="small"
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box
          sx={{
            padding:2,
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
            getRowId={(row) => row.recid}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[5, 10, 20, 25]}
            columnVisibilityModel={{
              recid: true,
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

export default CompanyAccess;
