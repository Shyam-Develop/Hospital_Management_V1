import React, { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Checkbox
} from "@mui/material";
import { VariableSizeList } from "react-window";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// Context for custom listbox
const LISTBOX_PADDING = 8; // Padding around the listbox
const OuterElementContext = createContext({});

// Outer element for the listbox
const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Custom Listbox component
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty("group")) {
      return 48; // Group header size
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize; // Limit to 8 items
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {({ index, style }) => React.cloneElement(itemData[index], { style })}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const ListboxComponent1 = React.forwardRef((props, ref) => {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children).flat();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemSize = smUp ? 40 : 40;

  const getChildSize = (child) => (child.group ? 10 : itemSize);
  const itemCount = itemData.length;
  const height = Math.min(8, itemCount) * itemSize;

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          height={height + 2 * LISTBOX_PADDING}
          width="100%"
          itemSize={(index) => getChildSize(itemData[index])}
          itemCount={itemCount}
          itemData={itemData}
          outerElementType={OuterElementType}
          innerElementType="ul"
          overscanCount={5}
        >
          {({ index, style }) =>
            React.cloneElement(itemData[index], { style })
          }
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent1.propTypes = {
  children: PropTypes.node,
};



















export const FormikOptimizedAutocomplete = ({
    value = null,
    onChange = () => {},
    url,
    height = 20,
    ...props
  }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(url, {
            // headers: {
            //   Authorization: process.env.REACT_APP_API_TOKEN,
            // },
          });
          setOptions(response.data.data || []); // Assuming API response has `Data` array
        } catch (error) {
          // console.error("Error fetching data:", error);
          setOptions([]);
          setError(error.response ? error.response.data.message: error.message);
          // setError("Failed to load. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return (
      <Autocomplete
        size="small"
        limitTags={1}
        fullWidth
        options={options}
        loading={loading}
        value={value}
        // isOptionEqualToValue={(option, value) => option.Name === value.Name}
        onChange={onChange}
        // getOptionLabel={(option) => option.Name}
        isOptionEqualToValue={(option, value) => option.Name === value.Name}
        // onChange={(event, newValue) => onChange(newValue)}
        getOptionLabel={(option) => option.Name}
        ListboxComponent={ListboxComponent} // Custom listbox component
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label || "Select Options"}
            error={!!error}
            helperText={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        {...props}
      />
    );
  };

  export function FormikCustomAutocompleteSingle({
    value = null,
    onChange,
    url,
    label = "Select Options",
    // multiple = true,
    height= 30,
    // filterData = [],
    ...props
  }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    
  
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response= await axios.get(url, 
            {
          //   headers: { Authorization: process.env.REACT_APP_API_TOKEN },
          }
        );
        setOptions(response.data.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
          setOptions([]);
        } finally {
          setLoading(false);
        }
      };
    
      const timeout = setTimeout(fetchData, 500); // Debounce API call
    
      return () => clearTimeout(timeout); // Cleanup timeout
    }, [url]);
  
    return (
      <Autocomplete
        sx={{
          "& .MuiAutocomplete-tag": { maxWidth: "90px" },
        }}
        size="small"
        // multiple={multiple}
        limitTags={2}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        onChange={onChange}
        options={options}
        isOptionEqualToValue={(option, value) => option.Name === value.Name}
        getOptionLabel={(option) =>option.Name}
        disableCloseOnSelect
        disableListWrap
        loading={loading}
        ListboxComponent={ListboxComponent1}
        // renderOption={(props, option, { selected }) => (
        //   <li {...props} style={{ display: "flex", gap: 2, height: 40 }}>
        //     <Checkbox
        //       size="small"
        //       sx={{ marginLeft: -1 }}
        //       checked={selected}
        //     />
        //     {`${option.Name}`}
        //   </li>
        // )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
 {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        {...props}
      />
    );
  }

  export function FormikCustomAutocompleteTabletsID({
    value = null,
    onChange,
    url,
    label = "Select Options",
    // multiple = true,
    height= 30,
    // filterData = [],
    ...props
  }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    
  
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response= await axios.get(url, 
            {
          //   headers: { Authorization: process.env.REACT_APP_API_TOKEN },
          }
        );
        setOptions(response.data.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
          setOptions([]);
        } finally {
          setLoading(false);
        }
      };
    
      const timeout = setTimeout(fetchData, 500); // Debounce API call
    
      return () => clearTimeout(timeout); // Cleanup timeout
    }, [url]);
  
    return (
      <Autocomplete
        sx={{
          "& .MuiAutocomplete-tag": { maxWidth: "90px" },
        }}
        size="small"
        // multiple={multiple}
        limitTags={2}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        onChange={onChange}
        options={options}
        isOptionEqualToValue={(option, value) => `${option.ItemNumber}||${option.Name}` ===`${value.ItemNumber}||${value.Name}`}
        getOptionLabel={(option) =>`${option.ItemNumber}||${option.Name}`}
        disableCloseOnSelect
        disableListWrap
        loading={loading}
        ListboxComponent={ListboxComponent1}
        // renderOption={(props, option, { selected }) => (
        //   <li {...props} style={{ display: "flex", gap: 2, height: 40 }}>
        //     <Checkbox
        //       size="small"
        //       sx={{ marginLeft: -1 }}
        //       checked={selected}
        //     />
        //     {`${option.Name}`}
        //   </li>
        // )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
 {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        {...props}
      />
    );
  }