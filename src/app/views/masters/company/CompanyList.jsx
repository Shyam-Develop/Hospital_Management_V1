import React, { useEffect } from "react";
import {
  IconButton,
  LinearProgress,
  Paper,
  Tooltip,
  styled,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useDispatch, useSelector } from "react-redux";
import { fetchListview } from "app/redux/slice/listviewSlice";
import { useLocation } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: {
    margin: "16px",
  },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CompanyList = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // CALL THE REDUX ACTION
  // useEffect(() => {
  //   dispatch(
  //     fetchListview({
  //       accessID: "TR014",
  //       screenName: "comapany",
  //       filter: "",
  //       any: "",
  //     })
  //   );
  // }, []);

  // REDUX STATE

  // TABLE HEADER COLUMN LIST
  //   const columns = useSelector((state) => state.listview.listviewColumnData);

  const columns = [
    {
      headerName: "RecordID",
      field: "RecordID",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: true,
    },
    {
      headerName: "SL#",
      field: "SLNO",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: false,
      maxWidth: 50,
    },
    {
      headerName: "Code",
      field: "Code",
      width: "100",
      align: "left",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Description",
      field: "Name",
      width: "300",
      align: "left",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Phone Number",
      field: "Contact",
      width: "170",
      align: "right",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Email-ID",
      field: "Email",
      width: "170",
      flex: 1,
      align: "left",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "SortOrder",
      field: "SortOrder",
      width: "100",
      align: "right",
      headerAlign: "center",
      hide: true,
    },
    {
      headerName: "Disable",
      field: "Disable",
      width: "100",
      align: "left",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Date & Time",
      field: "CreatedDateTime",
      width: "100",
      align: "center",
      headerAlign: "center",
      hide: true,
    },
    {
      headerName: "ImgApplicable",
      field: "ImgApp",
      width: "100",
      align: "left",
      headerAlign: "center",
      hide: true,
    },
    {
      headerName: "Sap",
      field: "Sap",
      width: "100",
      align: "left",
      headerAlign: "center",
      hide: true,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      sortable: false,
      headerAlign: "center",
      filterable: false,
      disableColumnMenu: true,
      disableExport: true,
      align: "center",
      renderCell: (params) => {
        return (
          <Tooltip title="Edit">
            <IconButton color="info" size="small">
              <ModeEditOutlineIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  const isLoading = useSelector((state) => state.listview.loading);
  const status = useSelector((state) => state.listview.status);
  const rows = useSelector((state) => state.listview.listviewRowData);

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Masters" }, { name: "Company List" }]}
        />
      </div>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <DataGrid
          sx={{ height: "650px" }}
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: GridToolbar,
          }}
          rows={[]}
          columns={columns}
          loading={isLoading}
          disableSelectionOnClick
          getRowId={(row) => row.RecordID}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          columnVisibilityModel={{
            RecordID: false,
            SortOrder: false,
            CreatedDateTime: false,
            ImgApp: false,
            Sap: false,
            Contact: false,
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
      </Paper>
    </Container>
  );
};

export default CompanyList;
