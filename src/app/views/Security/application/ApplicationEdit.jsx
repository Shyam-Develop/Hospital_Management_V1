import React from "react";
import {
  Paper,
  Button,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { Breadcrumb } from "app/components";

// ******************** ICONS ******************** //
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";


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

// ******************** Validation Schema ******************** //
const validationSchema = Yup.object({
  code: Yup.string()
    .min(3, "Code must be at least 3 characters")
    .max(15, "Code must be at most 15 characters"),

  sortOrder: Yup.string()
    .min(1, "Sort Order must be at least 1 character")
    .max(15, "Sort Order must be at most 15 characters"),

  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
});

// ******************** Price List Edit SCREEN  ******************** //
const ApplicationEdit = () => {
  // ******************** HOOKS AND CONSTANTS ******************** //
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const navigate = useNavigate();

  

  


  // ******************** LOCAL STATE ******************** //

  // ******************** REDUX STATE ******************** //

  return (
    <Container>
      <Formik
        initialValues={{
          recID: "",
          code: "",
          sortOrder: "",
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
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
          <form onSubmit={handleSubmit}>
            <div className="breadcrumb">
              <Breadcrumb
                routeSegments={[
                  { name: "Security" },
                  { name: "Application", path: "/pages/application" },
                  { name: `${params.mode} Application Detail` },
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
                  onClick={() => navigate("/pages/application")}
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
                    error={touched.code && Boolean(errors.code)}
                    helperText={touched.code && errors.code}
                    autoFocus
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
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
                

              </Box>
            </Paper>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default ApplicationEdit;
