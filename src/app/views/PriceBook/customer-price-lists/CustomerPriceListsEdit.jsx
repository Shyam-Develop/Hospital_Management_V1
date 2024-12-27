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
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

// ********************** ICONS ********************** //
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

// ********************** Price List Edit SCREEN  ********************** //
const CustomerPriceListsEdit = () => {
  // ********************** HOOKS AND CONSTANTS ********************** //
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const navigate = useNavigate();

  // ********************** LOCAL STATE ********************** //

  // ********************** REDUX STATE ********************** //

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Price Book" },
            {
              name: "Customer Price Lists",
              path: "/pages/customer-price-lists",
            },
            {
              name: `${params.mode} Customer Price Lists`,
            },
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
          >
            {params.mode === "delete" ? "Confirm" : "Save"}
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<ArrowBackIcon size="small" />}
            onClick={() => navigate(`/pages/price-list`)}
          >
            Back To Price List
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<ArrowBackIcon size="small" />}
            onClick={() => navigate(`/pages/customer-price-lists`)}
          >
            Back
          </Button>
        </Stack>
      </div>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <Formik
          initialValues={{
            PriceListGroupCode: "",
            PriceListGroupName: "",
            SortOrder: "",
            Disable: "",
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
                <Stack sx={{ gridColumn: "span 1" }} direction="column" gap={1}>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    variant="outlined"
                    type="text"
                    id="customer"
                    name="customer"
                    size="small"
                    options={autoComplete}
                    getOptionLabel={(option) => option.CustomerName}
                    renderInput={(params) => (
                      <TextField {...params} label="Customer" />
                    )}
                    disabled={params.mode === "delete" ?true:false}
                    
                  />
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={autoComplete}
                    getOptionLabel={(option) => option.AddressCode}
                    variant="outlined"
                    type="text"
                    id="address"
                    name="address"
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Address" />
                    )}
                    disabled={params.mode === "delete" ?true:false}
                  />
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={autoComplete}
                    getOptionLabel={(option) => option.ContactName}
                    variant="outlined"
                    type="text"
                    id="contact"
                    name="contact"
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Contact" />
                    )}
                    disabled={params.mode === "delete" ?true:false}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        id="FullPriceBook"
                        name="FullPriceBook"
                        sx={{ height: "10px" }}
                        disabled={params.mode === "delete" ?true:false}
                      />
                    }
                    label="Full Price Book"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ height: "10px" }}
                        disabled={params.mode === "delete" ?true:false}
                        size="small"
                        id="pDF"
                        name="pDF"
                      />
                    }
                    label="PDF"
                  />

                  <Autocomplete
                   disabled={params.mode === "delete" ?true:false}
                    size="small"
                    limitTags={1}
                    fullWidth
                    multiple
                    id="addPriceList"
                    name="addPriceList"
                    options={priceList}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.ppc_ItemDescription}
                    isOptionEqualToValue={(option, value) =>
                      option.ppc_ItemDescription === value.ppc_ItemDescription
                    }
                    value={[
                      {
                        Action: "Edit Delete",
                        ppc_PriceListID: "WHTEFZ",
                        ITEMNMBR: "102993",
                        ppc_ItemDescription: "Breast Boneless/Skinless Medium",
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
                        ppc_PriceListID: "WHTEFZ",
                        ITEMNMBR: "155106",
                        ppc_ItemDescription: "Breast Tender Clip",
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
                    ]}
                    renderOption={(props, option, { selected }) => {
                      const { key, ...optionProps } = props;
                      return (
                        <li key={key} {...optionProps}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.ppc_ItemDescription}
                        </li>
                      );
                    }}
                    sx={{ gridColumn: "span 1" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Add Price Lists" />
                    )}
                  />
                </Stack>

                <Stack sx={{ gridColumn: "span 1" }} direction="column" gap={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="Created DateTime"
                    name="Created DateTime"
                    label="Created DateTime"
                    size="small"
                    inputProps={{readOnly:true}}
                    disabled={params.mode === "delete" ?true:false}
                    //   error={!!touched.Created DateTime && !!errors.Created DateTime}
                    //   helperText={touched.Created DateTime && errors.Created DateTime}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="Lastmodified Date time"
                    name="Lastmodified Date time"
                    label="Lastmodified Date time"
                    size="small"
                    inputProps={{readOnly:true}}
                    disabled={params.mode === "delete" ?true:false}
                    //   error={!!touched.Lastmodified Date time && !!errors.Lastmodified Date time}
                    //   helperText={touched.Lastmodified Date time && errors.Lastmodified Date time}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="Created By"
                    name="Created By"
                    label="Created By"
                    size="small"
                    inputProps={{readOnly:true}}
                    disabled={params.mode === "delete" ?true:false}
                    //   error={!!touched.Created By && !!errors.Created By}
                    //   helperText={touched.Created By && errors.Created By}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        id="CutomPriceBook"
                        name="CutomPriceBook"
                        sx={{ height: "10px" }}
                        disabled={params.mode === "delete" ?true:false}
                      />
                    }
                    label="Cutom Price Book"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        id="eXCEL"
                        name="eXCEL"
                        sx={{ height: "10px" }}
                        disabled={params.mode === "delete" ?true:false}
                      />
                    }
                    label="EXCEL"
                  />
                </Stack>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default CustomerPriceListsEdit;

const autoComplete = [
  {
    CustomerNumber: 30200,
    CustomerName: "Alpine Food Distribution, Inc.",
    AddressCode: "PRIMARY",
    Location: "1017 S Boone Street",
    ContactName: "ELENA",
    ContactEmail: "",
    ContactPhone: "3.60703E+13",
  },
  {
    CustomerNumber: 30300,
    CustomerName: "Amarilis's Meat Market",
    AddressCode: "BILLING",
    Location: "1501 N Miller St",
    ContactName: "Dan Carr",
    ContactEmail: "",
    ContactPhone: "5.09889E+13",
  },
  {
    CustomerNumber: 1020730,
    CustomerName: "Sea Wolf Adventures",
    AddressCode: "NUSA",
    Location: "PO Box 312",
    ContactName: "Kimberly Owen",
    ContactEmail: "",
    ContactPhone: "9.07957E+13",
  },
  {
    CustomerNumber: 40100,
    CustomerName: "Bahm, Sydney",
    AddressCode: "999",
    Location: "Vendor #31729-01",
    ContactName: "Greg Thompson",
    ContactEmail: "",
    ContactPhone: "4.25314E+13",
  },
  {
    CustomerNumber: 40125,
    CustomerName: "Baileys IGA",
    AddressCode: "1",
    Location: "10333 Highway 12 SW",
    ContactName: "Larry Gueman",
    ContactEmail: "",
    ContactPhone: "3.60274E+13",
  },
  {
    CustomerNumber: 401400,
    CustomerName: "Barco, Adriana",
    AddressCode: "12",
    Location: "4905 Road 68",
    ContactName: "Meat Dept: Alberto",
    ContactEmail: "",
    ContactPhone: "5.09546E+13",
  },
  {
    CustomerNumber: 30350,
    CustomerName: "BBQ2U",
    AddressCode: "TONY",
    Location: "759 S 74th Place",
    ContactName: "",
    ContactEmail: "",
    ContactPhone: "8.77691E+13",
  },
  {
    CustomerNumber: 30450,
    CustomerName: "BB Ranch Butcher Shop",
    AddressCode: "MAIN",
    Location: "12637 NE Woodinville Dr",
    ContactName: 'Rauldel "Gizmo" Calderon',
    ContactEmail: "",
    ContactPhone: "4.25487E+13",
  },
  {
    CustomerNumber: 34057,
    CustomerName: "Aldrich's",
    AddressCode: "BILLING",
    Location: "940 Lawrence Street",
    ContactName: "Yos Ligtenberg",
    ContactEmail: "",
    ContactPhone: "3.60385E+13",
  },
  {
    CustomerNumber: 34058,
    CustomerName: "Alderwood Eggs",
    AddressCode: "BILLING",
    Location: "21126 44th Ave W",
    ContactName: "Hussain Al Mtow Aq",
    ContactEmail: "",
    ContactPhone: "4.25346E+13",
  },
];

const priceList = [
  {
    Action: "Edit Delete",
    ppc_PriceListID: "WHTEFZ",
    ITEMNMBR: "102993",
    ppc_ItemDescription: "Breast Boneless/Skinless Medium",
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
    ppc_PriceListID: "WHTEFZ",
    ITEMNMBR: "155106",
    ppc_ItemDescription: "Breast Tender Clip",
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
    ppc_PriceListID: "PORTFS",
    ITEMNMBR: "421055",
    ppc_ItemDescription: "Breast B&S Portion 5oz Filet Nat",
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
    ppc_PriceListID: "PORTFS",
    ITEMNMBR: "421061",
    ppc_ItemDescription: "Breast B&S Portion 6oz Filet Nat",
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
    ppc_ItemDescription: "Mag Breast Boneless & Skinless Bulk",
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
    ppc_PriceListID: "WHTEFZ",
    ITEMNMBR: "412611",
    ppc_ItemDescription: "Breast Boneless/Skinless Plat Hrvst",
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
    ppc_PriceListID: "WHTEFZ",
    ITEMNMBR: "452173",
    ppc_ItemDescription: "Breast Tender Jumbo Clipped",
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
    ppc_PriceListID: "PORTFS",
    ITEMNMBR: "421075",
    ppc_ItemDescription: "BRST 7Z B&S NAT FRSH",
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
    ppc_PriceListID: "WHTEFZ",
    ITEMNMBR: "500664",
    ppc_ItemDescription: "Breast Tenders S/A Traypack",
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
    ppc_PriceListID: "WHTEFZ",
    ITEMNMBR: "504507",
    ppc_ItemDescription: "Whole Breast Bone-In Medium",
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
