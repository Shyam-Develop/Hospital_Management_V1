import React from "react";
import {
  LinearProgress,
  Paper,
  Button,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  TextField,
  Stack,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Formik } from "formik";

// ********************** ICONS ********************** //
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";

// ********************** STYLED COMPONENTS ********************** //
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

// ********************** ITEM ATTRIBUTES EDIT SCREEN  ********************** //
const ItemAttributesEdit = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const navigate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  return (
    <Container>
      <Formik
        initialValues={{
          priceListID: "WHTEFZ",
          priceListDescription: "Whole Breast Bone-In Medium",
          itemNumber: "017832D",
          itemDescription: "Beef Sukiyaki Meat v3 - 1/Bx Cvp (Vanguard)",
          printSequence: "",
          includeInPB: "",
          manualChangesOnly: "",
        }}
        enableReinitialize={true}
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
                  { name: "Price Book" },
                  { name: "Price List", path: "/pages/price-list" },
                  {
                    name: `${params.mode} Price List Detail`,
                    path: `/pages/price-list/price-list-detail/${params.mode}`,
                  },
                  { name: "Item Attributes" },
                ]}
              />
              <Stack direction={"row"} gap={1}>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={<SaveIcon size="small" />}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  startIcon={<ArrowBackIcon size="small" />}
                  onClick={() =>
                    navigate(
                      `/pages/price-list/price-list-detail/${params.mode}`
                    )
                  }
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
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  id="priceListID"
                  name="priceListID"
                  label="Price List ID"
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{readOnly:true}}
                  value={values.priceListID}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  id="priceListDescription"
                  name="priceListDescription"
                  label="Price List Description"
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{readOnly:true}}
                  value={values.priceListDescription}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  id="itemNumber"
                  name="itemNumber"
                  label="Item Number"
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{readOnly:true}}
                  value={values.itemNumber}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  id="itemDescription"
                  name="itemDescription"
                  label="Item Description"
                  size="small"
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{readOnly:true}}
                  value={values.itemDescription}
                />
                <Stack sx={{ gridColumn: "span 2" }} direction="column" gap={"20px"}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="printSequence"
                    name="printSequence"
                    label="Print Sequence"
                    size="small"
                    //   error={!!touched.printSequence && !!errors.printSequence}
                    //   helperText={touched.printSequence && errors.printSequence}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="includeInPB"
                    name="includeInPB"
                    label="Include In PB"
                    size="small"
                    //   error={!!touched.includeInPB && !!errors.includeInPB}
                    //   helperText={touched.includeInPB && errors.includeInPB}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="manualChangesOnly"
                    name="manualChangesOnly"
                    label="Manual Changes Only"
                    size="small"
                    //   error={!!touched.manualChangesOnly && !!errors.manualChangesOnly}
                    //   helperText={touched.manualChangesOnly && errors.manualChangesOnly}
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

export default ItemAttributesEdit;
