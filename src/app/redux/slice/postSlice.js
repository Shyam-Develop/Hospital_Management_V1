
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {};

export const QueuePost = createAsyncThunk(
  "QueuePost/POST",
  async ({ idata }, { rejectWithValue }) => {
    try {
      const URL = `http://127.0.0.1:5000/api/HMS_QUEUE/createqueue`;
      const response = await axios.post(URL, idata, {
        headers: {
          Authorization: process.env.REACT_APP_API_TOKEN,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const QueueDelete = createAsyncThunk(
  "QueueDelete/DELETE",
  async ({ customer }, { rejectWithValue }) => {
    try {
      const URL = `http://127.0.0.1:5000/api/HMS_QUEUE/deletequeue/${customer}`;
      const response = await axios.delete(URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const HeaderPost = createAsyncThunk(
  "HeaderPost/POST",
  async ({ idata }, { rejectWithValue }) => {
    try {
      const URL = `http://127.0.0.1:5000/api/hms_header/createheader`;
      const response = await axios.post(URL, idata, {
        headers: {
          Authorization: process.env.REACT_APP_API_TOKEN,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const PostDoctor = createAsyncThunk(
  "PostDoctor/POST",
  async ({ doctorData }, { rejectWithValue }) => {
    try {
      const URL = `http://127.0.0.1:5000/doctor/postdoctor`;
      const response = await axios.post(URL, doctorData, {
        headers: {
          "Content-Type":"application/json",
          Authorization: process.env.REACT_APP_API_TOKEN,
        },
      });      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const PutDoctor = createAsyncThunk(
  "PutDoctor/PUT",
  async ({ Id,doctorData }, { rejectWithValue }) => {
    try {
      const URL = `http://127.0.0.1:5000/doctor/updatedoctor/${Id}`;
      const response = await axios.put(URL, doctorData, {
        headers: {
          "Content-Type":"application/json",
          Authorization: process.env.REACT_APP_API_TOKEN,
        },
      });      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
//   extraReducers(builder) {
//     builder
//       .addCase(priceListHeaderPost.pending, (state, action) => {})
//       .addCase(priceListHeaderPost.fulfilled, (state, action) => {})
//       .addCase(priceListHeaderPost.rejected, (state, action) => {});
//   },
});
export default postSlice.reducer;
