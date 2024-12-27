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
} from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useTheme } from "@emotion/react";
import Cover from "../../../assets/cover.jpg";
import { TrendingDown } from "@mui/icons-material";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import { IoIosMailOpen } from "react-icons/io";
import { IoMdPrint } from "react-icons/io";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { themeColors } from "app/components/baseTheme/themeColors";
import { Formik } from "formik";
import {
  addContactSchema,
  contactSchema,
} from "app/components/security/Validation";
import { Form, useNavigate, useSubmit } from "react-router-dom";
import * as Yup from "yup";
import { values } from "lodash";
import Swal from "sweetalert2";
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

export default function AddNewContact() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const theme = useTheme();

  // const contactSchema = Yup.object().shape({
  //   name: Yup.string().required("Required"),
  //   shipTo: Yup.string().required("Required"),
  //   address: Yup.string().required("Required"),
  //   gpCustomerNumber: Yup.string().required("Required"),
  //   contactName: Yup.string().required("Required"),
  //   email: Yup.string().email("Invalid email").required("Required"),
  //   phone: Yup.string().required("Required"),
  //   runGroup: Yup.string().required("Required")
  // });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // let submit = useSubmit();
  const initialValues = {
    name: "",
    shipTo: "",
    address: "",
    gpCustomerNumber: "",
    contactName: "",
    email: "",
    preferredEmail: false,
    phone: "",
    preferredPhone: false,
    provider: "",
    runGroup: "",
  };
  //   const handleSubmit = (values) => {
  //     console.log("Form submitted with values:", values);
  //     submit(values);
  //     // Perform any other actions you need on form submit here
  // };

  const naviagte = useNavigate();

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Price Book Directory" },
            { name: "Add New Contact" },
          ]}
        />
      </Box>
      <Box>
        <SimpleCard>

          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            // validationSchema={addContactSchema}
            onSubmit={(values, { resetForm }) => {
              Swal.fire({
                title: "Contact Added Successfully",
                icon: "success",
              });

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
              resetForm
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="10px"
                  margin={3}
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="name"
                    name="name"
                    label="Customer Name"
                    required
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }}
                    InputLabelProps={{
                      sx: { "& .MuiInputLabel-asterisk": { color: "red" } },
                    }}
                    size="small"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="shipTo"
                    name="shipTo"
                    label="Ship To"
                    required
                    size="small"
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }}
                    InputLabelProps={{
                      sx: { "& .MuiInputLabel-asterisk": { color: "red" } },
                    }}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="address"
                    name="address"
                    label="Address"
                    required
                    size="small"
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }}
                    InputLabelProps={{
                      sx: { "& .MuiInputLabel-asterisk": { color: "red" } },
                    }}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="gpCustomerNumber"
                    name="gpCustomerNumber"
                    label="GP Customer Number"
                    required
                    size="small"
                    InputLabelProps={{
                      sx: { "& .MuiInputLabel-asterisk": { color: "red" } },
                    }}
                    sx={{ gridColumn: isMobile ? "span 4" : "span 2" }}
                  />

                  <FormControl
                    sx={{
                      gridColumn: isMobile ? "span 4" : "span 2",
                      gap: "10px",
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      id="contactName"
                      name="contactName"
                      label="Contact Name"
                      required
                      size="small"
                      sx={{ gridColumn: isMobile ? "span 4" : "span 2" }}
                      InputLabelProps={{
                        sx: { "& .MuiInputLabel-asterisk": { color: "red" } },
                      }}
                    />

                    {/* Email with Preferred Delivery Method */}
                    <Box
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        alignItems: "start",
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="email"
                        name="email"
                        label="Email"
                        size="small"
                        required
                        sx={{
                          flex: 1,
                          marginRight: isMobile ? "0" : "8px",
                          marginBottom: isMobile ? "8px" : "0",
                        }}
                        InputLabelProps={{
                          sx: { "& .MuiInputLabel-asterisk": { color: "red" } },
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="preferredEmail"
                            sx={{
                              color: "#174c4f",
                              "&.Mui-checked": { color: "#174c4f" },
                            }}
                          />
                        }
                        label="Preferred Delivery Method"
                      />
                    </Box>

                    {/* Phone with Preferred Delivery Method */}
                    <Box
                      sx={{
                        gridColumn: "span 2",
                        display: "flex",
                        alignItems: "start",
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="phone"
                        name="phone"
                        label="Phone"
                        size="small"
                        sx={{
                          flex: 1,
                          marginRight: isMobile ? "0" : "8px",
                          marginBottom: isMobile ? "8px" : "0",
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="preferredPhone"
                            sx={{
                              color: "#174c4f",
                              "&.Mui-checked": { color: "#174c4f" },
                            }}
                          />
                        }
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
                      size="small"
                      sx={{ gridColumn: isMobile ? "span 4" : "span 2" }}
                    />

                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      id="runGroup"
                      name="runGroup"
                      label="Run Group"
                      required
                      size="small"
                      InputLabelProps={{
                        sx: { "& .MuiInputLabel-asterisk": { color: "red" } },
                      }}
                      sx={{ gridColumn: isMobile ? "span 4" : "span 2" }}
                    />
                  </FormControl>

                  {/* Submit Button */}
                  <Box
                    sx={{
                      gridColumn: "span 4",
                      display: "flex",
                      justifyContent: isMobile ? "center" : "flex-end",
                      gap: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        backgroundColor: "#174c4f",
                        color: "white",
                        "&:hover": { backgroundColor: "#174c4f" },
                      }}
                    >
                      SAVE
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      color="warning"
                      onClick={() =>
                        naviagte("/pages/view-directory/customer-info")
                      }
                    >
                      CANCEL
                    </Button>
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
