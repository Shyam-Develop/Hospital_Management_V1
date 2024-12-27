import {
    Autocomplete,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Fab,
    Button,
    IconButton,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Form, useSubmit } from "react-router-dom";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { themeColors } from "app/components/baseTheme/themeColors";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CustomerList from "../masters/cutomers/CustomerList";
import { CustomerInfoSchema } from "app/components/security/Validation";
import { Formik } from "formik";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
    margin: "15px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "10px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));





export default function CustomerInfo() {

const colors=themeColors;
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    // const location = useLocation();
    // const { name, customerId } = location.state || {};

    // const navigate = useNavigate();
    const rows = [
        { id:'1',name: "Acme Poultry", email: "AcmePoultry@gmail.com" },
        {id:'2', name: "Acme Poultry", email: "AcmePoultry@gmail.com" },
    ];
    const columns=[
        {field: 'name', headerName: 'Name', width: 300},
        {field: 'email', headerName: 'Email', width: 300},
    ];

    const navigate=useNavigate();

    const handleNavigateClick=()=>{
        navigate('/pages/add-new-contact')
    };
// let submit=useSubmit();
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Price Book Directory" },
                        { name: "View Directory",path:"/pages/view-directory" },
                        { name: "Customer Info" },
                    ]}
                />
            </Box>
            <Box>
                <SimpleCard>


          
    <Formik
      // initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={  CustomerInfoSchema}
      onSubmit={values=>{
        console.log(values);
        // submit(values)
    }}
    >
      {({
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
              values,
              handleSubmit,
            }) => (
        <form>
                <Box
            display="grid"
            gap="10px"
            margin={3}
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
            <FormControl sx={{ gridColumn: isMobile ? "span 4" : "span 2", gap: "10px" }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="name"
                    name="name"
                    label="Customer Name"
                    value={"Acme Poultry"}
                    required
                    size="small"
                    InputLabelProps={{
                        sx: {
                            '& .MuiInputLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                   
                />

                <FormControl sx={{ gap: "10px" }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="contactName"
                        name="contactName"
                        label="Contact Name"
                        value={"Acme Poultry"}
                        size="small"
                        
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="shipTo"
                        name="shipTo"
                        label="Ship To"
                        value={"America"}
                        size="small"
                       readonly
                    />
                </FormControl>

                <Box sx={{ gridColumn: "span 2", display: 'flex', alignItems: 'start', flexDirection: isMobile ? 'column' : 'row' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="email"
                        name="email"
                        label="Email"
                        size="small"
                        value={"AcmePoultry@gmail.com"}
                        sx={{ flex: 1, marginRight: isMobile ? "0" : "8px", marginBottom: isMobile ? "8px" : "0" }}  // Flex adjustment for mobile
                        readonly
                         />
                    <FormControlLabel
                        control={<Checkbox name="preferredEmail" defaultChecked={true} sx={{
                          color: "#174c4f",
                          '&.Mui-checked': {
                            color: "#174c4f",
                          },
                        }} />}
                        label="Preferred Delivery Method"
                    />
                </Box>

                {/* Phone with Preferred Delivery Method */}
                <Box sx={{ gridColumn: "span 2", display: 'flex', alignItems: 'start', flexDirection: isMobile ? 'column' : 'row' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="phone"
                        name="phone"
                        label="Phone"
                        size="small"
                        value={"1234567"}
                        sx={{ flex: 1, marginRight: isMobile ? "0" : "8px", marginBottom: isMobile ? "8px" : "0" }}  // Flex adjustment for mobile
                    />
                    <FormControlLabel
                        control={<Checkbox name="preferredPhone" sx={{
                          color: "#174c4f",
                          '&.Mui-checked': {
                            color: "#174c4f",
                          },
                        }}/>}
                        label="Preferred Delivery Method"
                    />
                </Box>

                <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="provider"
                    name="provider"
                    label="Provider"
                    value={"Meat Provider"}
                    size="small"
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }}  // Responsive grid span
                />
            </FormControl>

            <Box sx={{ gridColumn: "span 4", display: "flex", justifyContent: isMobile ? "center" : "flex-end" }}>
                <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#164D50",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#164D50", // Custom hover color
                      },
                    }}
                    onClick={handleNavigateClick}
                >
                    ADD
                </Button>
            </Box>

            {/* Full Width Table */}
            <Box sx={{ gridColumn: "span 4", width: "100%" }}>
            <Box
              
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: "black",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blue.palette.info.main,
                    color: colors.blue.palette.info.contrastText,
                  },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.blueDark.palette.info.main,
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blue.palette.info.main,
                  color: colors.blue.palette.info.contrastText,
                },
                "& .MuiCheckbox-root": {
                  color: "primary",
                },

              }}
            >
    <DataGrid
          sx={{ height: "250" }}
          slots={{
            loadingOverlay: LinearProgress,
            // toolbar: secondaryCustomToolbar,
          }}
          rows={rows}
          columns={columns}
        //   loading={isLoading}
          disableSelectionOnClick
          getRowId={(row) => row.id}
        //   onRowClick={handleRowClick}
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
          hideFooter={true} 
          // disableColumnFilter
          // disableColumnSelector
          // disableDensitySelector
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
        </Box>
</Box>
</Box>
</form>
      )}
    </Formik>
       


                </SimpleCard>
            </Box>
        </Container>
    );
}

