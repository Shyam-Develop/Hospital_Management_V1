import React, { useEffect } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorListData } from "app/redux/slice/getSlice";


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
const PharmacyandManagement = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch= useDispatch();
  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //
  const doctorRows=useSelector((state)=>state.getSlice.getDoctorList)
  console.log(doctorRows,'==DoctorRows')
  useEffect
  (()=>{
  dispatch(getDoctorListData())
  },[dispatch])
  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    // {
    //   headerName: "RECID",
    //   field: "RecordId",
    //   width: "150",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: false,
    // },
    // {
    //   headerName: "First Name",
    //   field: "FirstName",
    //   width: "150",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: true,
    // },
    // {
    //   headerName: "Last Name",
    //   field: "LastName",
    //   width: "150",
    //   align: "left",
    //   headerAlign: "left",
    //   hide: false,
    // },
    // {
    //   headerName: "Global ID",
    //   field: "GlobalID",
    //   width: "100",
    //   align: "right",
    //   headerAlign: "left",
    //   hide: false,
    // },
    // {
    //   headerName: "Email",
    //   field: "Email",
    //   width: "170",
    //   align: "left",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "Phone",
    //   field: "PhoneNumber",
    //   width: "170",
    //   align: "right",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "Alternate Phone",
    //   field: "AlternatePhone",
    //   width: "170",
    //   align: "right",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "Qualification",
    //   field: "Qualification",
    //   width: "150",
    //   align: "left",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "Special Qualification",
    //   field: "SpecialQualification",
    //   width: "170",
    //   align: "left",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "DOB",
    //   field: "DateOfBirth",
    //   width: "170",
    //   align: "right",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   headerName: "DOJ",
    //   field: "DateOfJoining",
    //   width: "170",
    //   align: "right",
    //   headerAlign: "center",
    //   hide: false,
    // },
    // {
    //   field: "Action",
    //   headerName: "Action",
    //   minWidth: 300,
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
    //           startIcon={<EditIcon color="action" size="small" />}
    //           onClick={() => {
    //             navigate("/admin/doctor-edit",{state:{RecordId:params.row.RecordId}});
    //           }}
    //         >
    //           Edit
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];

 

  // ********************** TOOLBAR ********************** //
  // ********************** TOOLBAR ********************** //
  function CustomToolbar() {
    // return (
    //   <GridToolbarContainer
    //     sx={{
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "flex-end", // Align everything to the right
    //       width: "100%",
    //       padding: 0.5,
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "row",
    //         alignItems: "center",
    //         gap: 1,
    //       }}
    //     >
    //       <GridToolbarQuickFilter />
    //       {/* Add Button next to the search box */}
    //       <Button
    //         sx={{ height: 25, marginLeft: 1 }}
    //         variant="contained"
    //         color="primary"
    //         size="small"
    //         startIcon={<AddIcon color="action" size="small" />}
    //         onClick={() => {
    //           navigate("/admin/doctor-edit",{state:{RecordId:0}});
    //         }}
    //       >
    //         Add
    //       </Button>
    //     </Box>
    //   </GridToolbarContainer>
    // );
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: " " }]} />
      </div>

      {/* <Paper sx={{ width: "100%", mb: 2 }}>
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
            rows={doctorRows}
            columns={columns}
            getRowId={(row) => row.RecordId}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[5, 10, 20, 25]}
            columnVisibilityModel={{
              doctorname: true,
              RecordId: false,
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
      </Paper> */}
    </Container>
  );
};

export default PharmacyandManagement;
