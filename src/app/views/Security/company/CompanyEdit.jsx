import React, { useState } from "react";
import {
  Paper,
  Button,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  TextField,
  Typography,
  Checkbox,
  FormControl,
  Stack,
  Autocomplete,
} from "@mui/material";
import { Breadcrumb } from "app/components";

// ******************* ICONS ******************* //
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";

// ******************* STYLED COMPONENTS ******************* //
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

// ******************* Validation Schema ******************* //
const validationSchema = Yup.object({
  code: Yup.string()
    .min(3, "Code must be at least 3 characters")
    .max(15, "Code must be at most 15 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .max(30, "Email must be at most 30 characters"),
  sequence: Yup.string()
    .min(1, "Sequence must be at least 1 character")
    .max(15, "Sequence must be at most 15 characters"),
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
  address: Yup.string()
    .min(3, "Address must be at least 3 characters")
    .max(50, "Address must be at most 50 characters"),
});

// ******************* Price List Edit SCREEN  ******************* //
const CompanyEdit = () => {
  // ******************* HOOKS AND CONSTANTS ******************* //
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const navigate = useNavigate();

  // ******************* LOCAL STATE ******************* //

  // ******************* REDUX STATE ******************* //

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          recID: "",
          code: "",
          email: "",
          sortOrder: "",
          name: "",
          address1: "",
          address2: "",
          address3: "",
          website: "",
          phonenumber: "",
          gfpbtitle: "",
          cfpbtitle: "",
          ccpbtitle: "",
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          console.log("Form submitted with values:", values);
          resetForm();
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
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="breadcrumb">
              <Breadcrumb
                routeSegments={[
                  { name: "Security" },
                  { name: "Company", path: "/pages/company" },
                  { name: `${params.mode} Company Detail` },
                ]}
              />
              <Stack direction={"row"} gap={1}>
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
                  disabled={isSubmitting}
                >
                  {params.mode === "delete" ? "Confirm" : "Save"}
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={<ArrowBackIcon size="small" />}
                  onClick={() => navigate("/pages/company")}
                >
                  Back
                </Button>
              </Stack>
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
                <Stack sx={{ gridColumn: "span 2" }} direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="code"
                    name="code"
                    label="Code"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    required
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    autoFocus
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    required
                    InputLabelProps={{
                      sx: {
                        "&.MuiInputLabel-asterisk": {
                          color: "red",
                        },
                      },
                    }}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="address"
                    name="address"
                    label="Address 1"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    value={values.address1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address1 && Boolean(errors.address1)}
                    helperText={touched.address1 && errors.address1}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="address"
                    name="address"
                    label="Address 3"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    value={values.address3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address3 && Boolean(errors.address3)}
                    helperText={touched.address3 && errors.address3}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={false}
                        label="I agree to the terms and conditions"
                      />
                    }
                    label="Disable"
                  />
                </Stack>

                <Stack sx={{ gridColumn: "span 2" }} direction="column" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="name"
                    name="name"
                    label="Name"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    required
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.code && !!errors.code}
                    helperText={touched.name && errors.name}
                    autoFocus
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    label="Mobile"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    value={values.phonenumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phonenumber && Boolean(errors.phonenumber)}
                    helperText={touched.phonenumber && errors.phonenumber}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="address"
                    name="address"
                    label="Address 2"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    value={values.address2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address2 && Boolean(errors.address2)}
                    helperText={touched.address2 && errors.address2}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="sequence"
                    name="sequence"
                    label="Sequence"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    InputProps={{
                      inputProps: {
                        style: {
                          textAlign: "right",
                        },
                      },
                    }}
                    value={values.sequence}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.sequence && Boolean(errors.sequence)}
                    helperText={touched.sequence && errors.sequence}
                  />
                </Stack>
              </Box>
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
  {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
justifyContent: "flex-start" ,         }}
        >
        </Box> */}
                
              
                <FormControl
                    sx={{
                      gridColumn: isNonMobile ? "span 4" : "span 2",
                      gap: "10px",
                    }}
                  >
                                  <Typography fontSize={"14px"} fontWeight={"bold"}>Price Book Title</Typography>

  </FormControl>

                <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="geniric"
                    name="geniric"
                    label="Generic Full Price Book"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    value={values.geniric}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.geniric && Boolean(errors.geniric)}
                    helperText={touched.geniric && errors.geniric}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="custom"
                    name="custom"
                    label="Custom Full Price Book"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    value={values.custom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.custom && Boolean(errors.custom)}
                    helperText={touched.custom && errors.custom}
                  />
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="customer"
                    name="customer"
                    label="Customer Custom Price Book"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    value={values.customer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.customer && Boolean(errors.customer)}
                    helperText={touched.customer && errors.customer}
                  />
               

                {/* <Stack sx={{ gridColumn: "span 2" }} direction="column" gap={2}>
              
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="customer"
                    name="customer"
                    label="Customer Custom PriceBook Title"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    value={values.customer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.customer && Boolean(errors.customer)}
                    helperText={touched.customer && errors.customer}
                  />
                </Stack> */}
    
              </Box>
              

            
            </Paper>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default CompanyEdit;
