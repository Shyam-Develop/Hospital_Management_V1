import React, { useState } from "react";
import {
  Paper,
  Button,
  Box,
  styled,
  useTheme,
  useMediaQuery,
  Checkbox,
  TextField,
  FormControlLabel,
  Stack,
  Autocomplete,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
  FormControl,
  Typography,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import logo from "../../../../assets/plylogo.png";

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

  email: Yup.string()
    .email("Invalid email format")
    .max(30, "Email must be at most 30 characters"),

  sequence: Yup.string()
    .min(1, "Sequence must be at least 1 character")
    .max(15, "Sequence must be at most 15 characters"),

  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),

  userCompany: Yup.string()
    .min(3, "User Company must be at least 3 characters")
    .max(50, "User Company must be at most 50 characters"),
});

// ******************** Price List Edit SCREEN  ******************** //
const UserEdit = () => {
  // ******************** HOOKS AND CONSTANTS ******************** //
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const params = useParams();
  const navigate = useNavigate();

  // ******************** LOCAL STATE ******************** //
  const [openAlert, setOpenAlert] = useState(false);
  const [postError, setPostError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // ******************** REDUX STATE ******************** //

  const defaultcompany = [""];
  const usergroup = [""];
  const rungroup = [""];

  //=======================================SAVE================================//

  const HandleSave = async (values) => {
    if (params.mode === "delete") {
      setOpenDialog(true);
    }
  };

  // ******************** DELETE ******************** //

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleDelete = async () => {
    
    setOpenDialog(false);
    setOpenAlert(true);
   
  };

  return (
    <Container>
      <Formik
        initialValues={{
          recID: "",
          code: "",
          password: "",
          firstname: "",
          lastname: "",
          email: "",
          sequence: "",
          name: "",
          userCompany: "",
          defaultrungroup: "",
          admin: "",
          appln: "",
          cocode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          HandleSave(values);
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
                  { name: "User", path: "/pages/user" },
                  { name: `${params.mode} User Detail` },
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
                  onClick={() => navigate("/pages/user")}
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
                    disabled={params?.mode === "delete"}
                    required
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.code && Boolean(errors.code)}
                    helperText={touched.code && errors.code}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    disabled={params?.mode === "delete"}
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastname && Boolean(errors.lastname)}
                    helperText={touched.lastname && errors.lastname}
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
                    value={values.email}
                    disabled={params?.mode === "delete"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="confirmpassword"
                    name="confirmpassword"
                    label="Confirm Password"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    disabled={params?.mode === "delete"}
                    required
                    value={values.confirmpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmpassword && Boolean(errors.confirmpassword)
                    }
                    helperText={
                      touched.confirmpassword && errors.confirmpassword
                    }
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
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    disabled={params?.mode === "delete"}
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstname && Boolean(errors.firstname)}
                    helperText={touched.firstname && errors.firstname}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="mobilenumber"
                    name="mobilenumber"
                    label="Mobile"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    disabled={params?.mode === "delete"}
                    value={values.mobilenumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.mobilenumber && Boolean(errors.mobilenumber)}
                    helperText={touched.mobilenumber && errors.mobilenumber}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    id="password"
                    name="password"
                    label="Password"
                    size="small"
                    sx={{ gridColumn: "span 2" }}
                    disabled={params?.mode === "delete"}
                    required
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
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
                    disabled={params?.mode === "delete"}
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
  <FormControl
    sx={{
      gridColumn: isNonMobile ? "span 4" : "span 4",
      gap: "10px",
    }}
  >
    <Typography fontSize={"14px"} fontWeight={"bold"}>
      Settings
    </Typography>
  </FormControl>
  <Autocomplete
    fullWidth
    id="defaultcompany"
    name="defaultcompany"
    options={defaultcompany}
    disabled={params?.mode === "delete"}
    value={values.defaultcompany}
    onChange={(event, newValue) =>
      handleChange({
        target: { name: "defaultcompany", value: newValue },
      })
    }
    onBlur={handleBlur}
    disableClearable
    renderInput={(params) => (
      <TextField
        {...params}
        label="Default Company"
        size="small"
        error={
          touched.defaultcompany && Boolean(errors.defaultcompany)
        }
        helperText={
          touched.defaultcompany && errors.defaultcompany
        }
        sx={{ gridColumn: "span 2" }}
      />
    )}
    sx={{ gridColumn: "span 2", gap: "20px" }}
  />
  <Autocomplete
    fullWidth
    id="usergroup"
    name="usergroup"
    options={usergroup}
    disabled={params?.mode === "delete"}
    value={values.usergroup}
    onChange={(event, newValue) =>
      handleChange({
        target: { name: "usergroup", value: newValue },
      })
    }
    onBlur={handleBlur}
    disableClearable
    renderInput={(params) => (
      <TextField
        {...params}
        label="User Group"
        size="small"
        error={touched.usergroup && Boolean(errors.usergroup)}
        helperText={touched.usergroup && errors.usergroup}
        sx={{ gridColumn: "span 2" }}
      />
    )}
    sx={{ gridColumn: "span 2", gap: "20px" }}
  />
  <Autocomplete
    fullWidth
    id="rungroup"
    name="rungroup"
    options={rungroup}
    disabled={params?.mode === "delete"}
    value={values.rungroup}
    onChange={(event, newValue) =>
      handleChange({
        target: { name: "rungroup", value: newValue },
      })
    }
    onBlur={handleBlur}
    disableClearable
    renderInput={(params) => (
      <TextField
        {...params}
        label="Run Group"
        size="small"
        error={touched.rungroup && Boolean(errors.rungroup)}
        helperText={touched.rungroup && errors.rungroup}
        sx={{ gridColumn: "span 2" }}
      />
    )}
    sx={{ gridColumn: "span 2", gap: "20px" }}
  />
</Box>

            </Paper>
          </form>
        )}
      </Formik>

      <Dialog open={openDialog} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={logo} width="150px" height="150px" alt="" />
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            {`Are you sure you want to Delete the User?`}
          </DialogContent>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "auto", 
            }}
          >
            <DialogActions sx={{ width: "100%" }}>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.light, 
                  },
                  color: theme.palette.secondary.contrastText,
                  bgcolor: theme.palette.secondary.light,
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.light, 
                  },
                  color: theme.palette.secondary.contrastText,
                  bgcolor: theme.palette.secondary.light,
                  fontWeight: "bold",
                }}
                type="submit"
                onClick={handleDelete}
              >
                Confirm
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default UserEdit;
