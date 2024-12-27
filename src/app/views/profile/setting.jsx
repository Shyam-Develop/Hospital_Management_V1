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
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import { FaRegImage } from "react-icons/fa6";
import Publish from "@mui/icons-material/Publish";
import { FlexAlignCenter, FlexBox } from "app/components/FlexBox";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { convertHexToRGB } from "app/utils/utils";
import { useDropzone } from "react-dropzone";
import useSettings from "app/hooks/useSettings";
import { themeColors } from "app/components/baseTheme/themeColors";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getLocalListview } from "app/redux/slice/listviewSlice";
import useAuth from "app/hooks/useAuth";

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

const IMG = styled("img")(() => ({
  width: "100%",
  overflow: "hidden",
}));

const DropZone = styled(FlexAlignCenter)(({ isDragActive, theme }) => ({
  height: 70,
  width: "50%",
  cursor: "pointer",
  borderRadius: "4px",
  marginBottom: "16px",
  transition: "all 350ms ease-in-out",
  border: `2px dashed rgba(${convertHexToRGB(theme.palette.text.primary)}, 0.3)`,
  "&:hover": {
    background: `rgb(${convertHexToRGB(theme.palette.text.primary)}, 0.2) !important`,
  },
  background: isDragActive ? "rgb(0, 0, 0, 0.15)" : "rgb(0, 0, 0, 0.01)",
}));

const CustomIconButton = styled(IconButton)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor,
  color: "white",
  margin: theme.spacing(1),
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  "&:hover": {
    backgroundColor: bgcolor,
  },
}));

const plyMouth = {
  companyID:23,
  phone1:"785-236-7568",
  phone2:"785-236-1526",
  fax: "(206) 622-2625",
  logo:"/assets/images/plylogo.png",
  genFullPrcieBookImg:'/assets/coverimg/plymouthcoverimg.jpg',
  customerFullPriceBookImg:'/assets/coverimg/plymouthcoverimg.jpg',
  customerCustomPriceBookImg:'/assets/coverimg/plymouthcoverimg.jpg'
}

const  nicky  = {
  companyID:24,
  phone1:"785-236-7568",
  phone2:"785-236-1526",
  fax: "(206) 622-2625",
  logo:"/assets/images/nicky.png",
  genFullPrcieBookImg:'/assets/coverimg/nickycoverimg.jpg',
  customerFullPriceBookImg:'/assets/coverimg/nickycoverimg.jpg',
  customerCustomPriceBookImg:'/assets/coverimg/nickycoverimg.jpg'
}

const sjfood = {
  companyID:25,
  phone1:"785-236-4852",
  phone2:"785-236-7845",
  fax: "(206) 622-2635",
  logo:"/assets/images/sjfood.png",
  genFullPrcieBookImg:'/assets/coverimg/sjcoverimg.jpg',
  customerFullPriceBookImg:'/assets/coverimg/sjcoverimg.jpg',
  customerCustomPriceBookImg:'/assets/coverimg/sjcoverimg.jpg'
}
const Settings = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  const {user,updateUser} = useAuth()
  
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Profile" }, { name: "Settings" }]}
        />
      </Box>

      <Box>
        <SimpleCard>
          <Box
            display="grid"
            gap="10px"
            margin={3}
            height="50vh"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },}}
          >
            <FormControl
              fullWidth
              size="small"
              sx={{ gridColumn: "span 2" }}
            >
              <InputLabel id="demo-simple-select-label">Company</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Company"
                value={user.company}
                onChange={(e) => updateUser(
                  {
                  ...user,
                  company:e.target.value,
                  companyID:e.target.value == "Plymouth" ? plyMouth.companyID : e.target.value == "Nicky" ? nicky.companyID : sjfood.companyID,
                  phone1:e.target.value == "Plymouth" ? plyMouth.phone1 : e.target.value == "Nicky" ? nicky.phone1 : sjfood.phone1,
                  phone2:e.target.value == "Plymouth" ? plyMouth.phone2 : e.target.value == "Nicky" ? nicky.phone2 : sjfood.phone2,
                  fax:e.target.value == "Plymouth" ? plyMouth.fax : e.target.value == "Nicky" ? nicky.fax : sjfood.fax,
                  logo:e.target.value == "Plymouth" ? plyMouth.logo : e.target.value == "Nicky" ? nicky.logo : sjfood.logo,
                  genFullPrcieBookImg:e.target.value == "Plymouth" ? plyMouth.genFullPrcieBookImg : e.target.value == "Nicky" ? nicky.genFullPrcieBookImg : sjfood.genFullPrcieBookImg,
                  customerFullPriceBookImg:e.target.value == "Plymouth" ? plyMouth.customerFullPriceBookImg : e.target.value == "Nicky" ? nicky.customerFullPriceBookImg : sjfood.customerFullPriceBookImg,
                  customerCustomPriceBookImg:e.target.value == "Plymouth" ? plyMouth.customerCustomPriceBookImg : e.target.value == "Nicky" ? nicky.customerCustomPriceBookImg : sjfood.customerCustomPriceBookImg,
                 }
                )}
              >
                <MenuItem value={"Plymouth"}>Plymouth</MenuItem>
                <MenuItem value={"S & J"}>S & J</MenuItem>
                <MenuItem value={"Nicky"}>Nicky</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              size="small"
              sx={{ gridColumn: "span 2" }}
            >
              <TextField 
              id="runGroup"
              label="Run Group"
              name="runGroup"
              variant="outlined"
              size="small"
              />
            </FormControl>
          </Box>

          {/* Buttons at the bottom */}
          <Box display="flex" justifyContent="flex-end" gap="10px" margin={3}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#174c4f",
                color: "white",
                "&:hover": { backgroundColor: "#174c4f" },
              }}
            >
              Save
            </Button>
          </Box>
        </SimpleCard>
      </Box>
    </Container>
  );
};
export default Settings;
