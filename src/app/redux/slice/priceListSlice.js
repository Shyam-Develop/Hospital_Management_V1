import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  genricPriceStatus: "idle",
  genricPriceLoading: false,
  genricPriceData: [],
  genricError:{}
};

export const getGenricPriceList = createAsyncThunk(
  'posts/fetchPosts', // action type
  async (_, { rejectWithValue }) => {
    try {
      const URL = `${process.env.REACT_APP_BASE_URL}Pdf/GetGenricPriceBook`
      console.log("🚀 ~ URL:", URL)
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        headers: {
          'Authorization': process.env.REACT_APP_API_TOKEN, 
        }
      });
      console.log("🚀 ~ response:", response)
      return response.data; // return the response data
    } catch (error) {
      // If the request fails, return a custom error message
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
 
     
     


const priceListSlice = createSlice({
  name: "priceList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGenricPriceList.pending, (state, action) => {
        state.genricPriceStatus = "pending";
        state.genricPriceLoading = true;
        state.genricPriceData = [];
      })
      .addCase(getGenricPriceList.fulfilled, (state, action) => {
        state.genricPriceStatus = "fulfilled";
        state.genricPriceLoading = false;
        state.genricPriceData = action.payload;
      })
      .addCase(getGenricPriceList.rejected, (state, action) => {
        state.genricPriceStatus = "rejected";
        state.genricPriceLoading = false;
        state.genricError = action.error;
      });
  },
});
export default priceListSlice.reducer;
