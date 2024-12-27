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
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, RefreshOutlined } from "@mui/icons-material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import VisibilityIcon from '@mui/icons-material/Visibility';
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
const PriceList = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const naviate = useNavigate()

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  // ********************** COLUMN AND ROWS ********************** //
  const columns = [
    {
      headerName: "Price List ID",
      field: "ppc_PriceListID",
      width: "200",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: " Price List Description",
      field: "ppc_ItemDescription",
      minWidth: 250,
      flex: 1,
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 300,
      flex:1,
      sortable: false,
      headerAlign: "center",
      filterable: false,
      disableColumnMenu: true,
      disableExport: true,
      align: "center",
      renderCell: (params) => {
        return (
          <div >
            <Button
              sx={{height:25}}
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                naviate('/pages/price-list/price-list-detail/edit');
              }}
              startIcon={<ModeEditOutlineIcon  size="small"/>}
            >
              Edit
            </Button>

            <Button
              sx={{height:25,marginLeft:1}}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon color="error" size="small" />}
              onClick={() => {
                naviate('/pages/price-list/price-list-detail/delete');
              }}
            >
              Delete
            </Button>

            <Button
              sx={{height:25,marginLeft:1}}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<VisibilityIcon  size="small" />}
              onClick={() => {
                naviate('/pages/price-list/price-list-items');
              }}
            >
              View Items
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      Action: "Edit Delete",
      ppc_PriceListID: "ZUPAN",
      ITEMNMBR: "102993",
      ppc_ItemDescription: "Zupan Custom List of Pricelist Items",
      ppc_PrintSequence: 0,
      ppc_SpanishDescription: "",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 0,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 0,
      UOFM: "CASE",
      QTYONHND: 0,
      QTYONORD: 0,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "51:13.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "31:03.0",
      UNITPRCE: 0,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1107,
    },
    {
      Action: "Edit Delete",
      ppc_PriceListID: "ZENNER",
      ITEMNMBR: "155106",
      ppc_ItemDescription: "Zenner's Sausage",
      ppc_PrintSequence: 0,
      ppc_SpanishDescription: "",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 0,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 0,
      UOFM: "CASE",
      QTYONHND: 0,
      QTYONORD: 0,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "51:13.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "31:03.0",
      UNITPRCE: 0,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1108,
    },
    {
      Action: "Edit Delete",
      ppc_PriceListID: "WINGFZ",
      ITEMNMBR: "421055",
      ppc_ItemDescription: "Frozen Wings",
      ppc_PrintSequence: 10,
      ppc_SpanishDescription: "",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 1,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 0,
      UOFM: "CASE",
      QTYONHND: 10,
      QTYONORD: 0,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "55:56.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "35:47.0",
      UNITPRCE: 3.67,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1158,
    },
    {
      Action: "Edit Delete",
      ppc_PriceListID: "WINGFS",
      ITEMNMBR: "421061",
      ppc_ItemDescription: "Fresh Wings",
      ppc_PrintSequence: 15,
      ppc_SpanishDescription: "",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 1,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 1,
      UOFM: "CASE",
      QTYONHND: 330,
      QTYONORD: 10,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "55:56.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "35:50.0",
      UNITPRCE: 3.67,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1159,
    },
    {
      Action: "Edit Delete",
      ppc_PriceListID: "WHTEFZ",
      ITEMNMBR: "200208",
      ppc_ItemDescription: "Frozen - White Meat",
      ppc_PrintSequence: 0,
      ppc_SpanishDescription: "",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 0,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 0,
      UOFM: "CASE",
      QTYONHND: 0,
      QTYONORD: 0,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "51:13.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "31:03.0",
      UNITPRCE: 0,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1111,
    },
    {
      Action: "Edit Delete",
      ppc_PriceListID: "WHTEFS",
      ITEMNMBR: "412611",
      ppc_ItemDescription: "Fresh - White Meat",
      ppc_PrintSequence: 0,
      ppc_SpanishDescription: "",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 0,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 0,
      UOFM: "CASE",
      QTYONHND: 0,
      QTYONORD: 0,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "51:13.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "31:03.0",
      UNITPRCE: 1.34,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1112,
    },
    {
      Action: "Edit Delete",
      ppc_PriceListID: "WHOLEY",
      ITEMNMBR: "452173",
      ppc_ItemDescription: "Wholey",
      ppc_PrintSequence: 0,
      ppc_SpanishDescription: "",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 0,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 0,
      UOFM: "CASE",
      QTYONHND: 0,
      QTYONORD: 0,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "51:13.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "31:03.0",
      UNITPRCE: 0,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1113,
    },
    {
      Action: "Edit Delete",
      ppc_PriceListID: "VEAL",
      ITEMNMBR: "421075",
      ppc_ItemDescription: "Fresh Veal",
      ppc_PrintSequence: 0,
      ppc_SpanishDescription: "",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 0,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 1,
      UOFM: "CASE",
      QTYONHND: 0,
      QTYONORD: 0,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "55:56.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "34:58.0",
      UNITPRCE: 0,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1160,
    },
    {
      Action: "Edit Delete",
      ppc_PriceListID: "ULIS",
      ITEMNMBR: "500664",
      ppc_ItemDescription: "Uli's Sausage",
      ppc_PrintSequence: 0,
      ppc_SpanishDescription: "",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 0,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 0,
      UOFM: "CASE",
      QTYONHND: 0,
      QTYONORD: 0,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "51:13.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "31:03.0",
      UNITPRCE: 0,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1115,
    },
    {
      Action: "Edit Delete",
      ppc_PriceListID: "TYSNDL",
      ITEMNMBR: "504507",
      ppc_ItemDescription: "Tyson Deli",
      ppc_PrintSequence: 0,
      ppc_SpanishDescription: "Pechuga Con Hueso",
      ppc_OverrideSeq: "",
      ppc_PriceComments_1: "",
      ppc_PriceComments_2: "",
      ppc_PriceComments_3: "",
      ppc_PriceComments_4: "",
      ppc_PriceComments_5: "",
      ppc_Comment: "",
      ENDDATE: "00:00.0",
      ppc_PrintItem: 0,
      ppc_SubListBreak: "",
      ppc_ManualChangeOnly: 0,
      UOFM: "CASE",
      QTYONHND: 0,
      QTYONORD: 0,
      CRUSRID: "dhopkins",
      CREATDDT: "00:00.0",
      TIME1: "51:13.0",
      MDFUSRID: "dhopkins",
      MODIFDT: "00:00.0",
      LSTCNTTM: "31:03.0",
      UNITPRCE: 1.25,
      ASOFDATE: "00:00.0",
      DEX_ROW_ID: 1116,
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

          {/* <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<RefreshOutlined fontSize="small" />}
            onClick={() => console.log("Refreshing...")}
          >
            Refresh
          </Button> */}
          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<Add fontSize="small" />}
            onClick={() => {
              naviate('/pages/price-list/price-list-detail/add');
            }}
          >
            Add Price List
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => {
              naviate('/pages/price-lists-group/price-lists-group-detail/add');
            }}
          >
            Create Print Group
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => {
              naviate('/pages/customer-price-lists/customer-price-lists-detail/add');
            }}
          >
            Create Customer Price Lists
          </Button>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Price Book" }, { name: "Price List" }]}
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
            checkboxSelection
            disableSelectionOnClick={true}
            disableRowSelectionOnClick={true}
            
            getRowId={(row) => row.DEX_ROW_ID}
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
            rowSelectionModel={[1107,1108]}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default PriceList;
