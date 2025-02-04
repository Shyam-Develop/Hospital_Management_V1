import React from "react";
import {
  Paper,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Autocomplete,
  Stack,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import AddIcon from "@mui/icons-material/Add";

// ******************** ICONS ******************** //

import { useNavigate, useParams } from "react-router-dom";

// ******************** STYLED COMPONENTS ******************** //
const Container = styled("div")(({ theme }) => ({
  margin: "15px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
}));

// ******************** Price List Edit SCREEN  ******************** //
const Pharmacy = () => {
  // ******************** HOOKS AND CONSTANTS ******************** //
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const navigate = useNavigate();

  const dataGridHeight = 500;
  const dataGridRowHeight = 40;
  const columns = [
    {
      headerName: "Item Number",
      field: "itemnumber",
      width: "200",
      align: "left",
      headerAlign: "left",
      hide: true,
    },
    {
      headerName: "Desc",
      field: "desc",
      width: "170",
      align: "left",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Quantity",
      field: "qty",
      width: "170",
      align: "right",
      headerAlign: "left",
      hide: false,
    },
    {
      headerName: "Price",
      field: "price",
      width: "150",
      align: "left",
      headerAlign: "center",
      hide: false,
    },
    {
      headerName: "Amount",
      field: "amount",
      width: "150",
      align: "left",
      headerAlign: "center",
      hide: false,
    },
  ];

  const rows = [
    {
      itemnumber: "",
      desc: "",
      qty: "",
      price: "",
      amount: "",
    },
  ];

  // ******************** LOCAL STATE ******************** //

  // ******************** REDUX STATE ******************** //

  // ********************** TOOLBAR ********************** //
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end", // Align everything to the right
          width: "60%",
          padding: 0.5,
          marginLeft: -0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            marginTop: "-1%",
          }}
        >
          <Autocomplete
            fullWidth
            disablePortal
            options={autoComplete3}
            getOptionLabel={(option) => option.ContactName}
            variant="outlined"
            type="text"
            id="barcode/enter material name-ssdd"
            name="barcode/enter material name-ssdd"
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Barcode/Enter Material Name - SSDD"
                sx={{ width: "150%" }}
              />
            )}
          />

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              variant="contained"
              sx={{
                height: "100%",
                width: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: -35,
              }}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Box>
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Pharmacy" }]} />
      </div>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Box
          display="grid"
          gap="20px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
            padding: "10px",
          }}
        >
          <Stack
            sx={{
              gridColumn: "span 2",
              width: "80%",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1,
            }}
            direction="column"
            // gap={1}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
              }}
            >
              <Autocomplete
                fullWidth
                disablePortal
                options={autoComplete1}
                getOptionLabel={(option) => option.ContactName}
                variant="outlined"
                type="text"
                id="Category"
                name="category"
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    sx={{ minWidth: 230 }}
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                alignItems: "center",
              }}
            >
              <TextField
                label="Date"
                type="date"
                id="date"
                name="date"
                size="small"
                sx={{ minWidth: 230 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="Customer"
                name="customer"
                size="small"
                label="Customer"
                sx={{ minWidth: 225 }}
              />
            </Box>
          </Stack>

          <Stack sx={{ gridColumn: "span 4" }} direction="column" gap={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    height: dataGridHeight,
                    width: "140%",
                    marginTop: -1,

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
                    getRowId={(row) => row.itemnumber}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 20 } },
                    }}
                    pageSizeOptions={[5, 10, 20, 25]}
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
              </Grid>

              <Grid item xs={3.5} sx={{ ml: "auto" }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "28px",
                    lineHeight: "56px",
                    textAlign: "left",
                    mb: 1,
                    mt: -3,
                  }}
                >
                  Select Items
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography
                      sx={{ fontWeight: "bold", mt: 1, textAlign: "left" }}
                    >
                      UOM:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      // label="UOM"
                      sx={{ textAlign: "left" }}
                    />
                  </Grid>

                  {[...Array(1)].map((_, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          sx={{ fontWeight: "bold", mt: 1, textAlign: "left" }}
                        >
                          C.UOM:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          // label="B.UOM"
                          sx={{ textAlign: "left" }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          sx={{ fontWeight: "bold", mt: 1, textAlign: "left" }}
                        >
                          Expiry Date:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          // label="Expiry Date"
                          type="date"
                          sx={{ textAlign: "left" }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          sx={{ fontWeight: "bold", mt: 1, textAlign: "left" }}
                        >
                          MRP:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          // label="MRP"
                          sx={{ textAlign: "left" }}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>

                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "28px",
                    lineHeight: "56px",
                    textAlign: "left",
                    mb: 1,
                  }}
                >
                  Summary
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography
                      sx={{ fontWeight: "bold", mt: 1, textAlign: "left" }}
                    >
                      Discount:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      // label="Discount"
                      sx={{ textAlign: "left" }}
                    />
                  </Grid>

                  {[...Array(1)].map((_, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          sx={{ fontWeight: "bold", mt: 0, textAlign: "left" }}
                        >
                          Additional Discount:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          // label="Additional Discount"
                          sx={{ textAlign: "left" }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          sx={{ fontWeight: "bold", mt: 1, textAlign: "left" }}
                        >
                          Round Off:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          // label="Round Off"
                          sx={{ textAlign: "left" }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          sx={{ fontWeight: "bold", mt: 1, textAlign: "left" }}
                        >
                          Net Total:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          // label="Net Total"
                          sx={{ textAlign: "left" }}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Stack>

          <Stack sx={{ gridColumn: "span 5" }} direction="column" gap={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: 1,
                marginTop: -2,
                marginRight: 52,
                marginBottom: 0,
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="gst"
                name="gst"
                size="small"
                label="GST"
                sx={{ minWidth: 118 }}
                InputLabelProps={{
                  style: { fontWeight: "bold" },
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="s.gst"
                name="s.gst"
                size="small"
                label="S.GST"
                sx={{ minWidth: 118 }}
                InputLabelProps={{
                  style: { fontWeight: "bold" },
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="c.gst"
                name="c.gst"
                size="small"
                label="C.GST"
                sx={{ minWidth: 118 }}
                InputLabelProps={{
                  style: { fontWeight: "bold" },
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                id="total"
                name="total"
                size="small"
                label="Total"
                sx={{ minWidth: 118 }}
                InputLabelProps={{
                  style: { fontWeight: "bold" },
                }}
              />
            </Box>
          </Stack>
          <Stack sx={{ gridColumn: "span 5" }} direction="column" gap={2}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{
                mb: 2,
                margin: -1,
                marginTop: -3,
                marginBottom: 5,
                marginLeft: -2,
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={autoComplete}
                    getOptionLabel={(option) => option.ContactName}
                    variant="outlined"
                    type="text"
                    id="Queue"
                    name="queue"
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Queue"
                        sx={{ minWidth: 100, marginRight: 30 }}
                      />
                    )}
                  />
             
                </Grid>
                <Grid item sx={{ marginLeft: -10 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100px",
                      backgroundColor: "#FFEB3B",
                      color: "black",
                    }}
                  >
                    Queue
                  </Button>
                </Grid>
              </Grid>
                    <Grid
                item
                xs={12}
                sm={6}
                container
                justifyContent="flex-end"
                spacing={2}
              >
 
                <Grid item sx={{ marginRight: "420px" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100px",
                      backgroundColor: "#66BB6A",
                      color: "black",
                    }}
                  >
                    Pay Now
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Pharmacy;

const autoComplete = [{ ContactName: "NK" }, { ContactName: "Safin" }];

const autoComplete1 = [
  { ContactName: "Tablets" },
  { ContactName: "Syrups" },
  { ContactName: "Medicine" },
  { ContactName: "Stitching Material" },
  { ContactName: "Injection" },
  { ContactName: "Others" },
];
const autoComplete3 = [{ ContactName: "Patient" }];
