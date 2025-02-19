import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
   getPharmacyList:[],
   getPharmacyListLoading:false,
   getPharmacyListError:null,
   getPharmacyListStatus:'idle',
   getQueueList:{},
   getQueueListLoading:false,
   getQueueListError:null,
   getQueueListStatus:'idle'
}
export const getPharmacyListData = createAsyncThunk(
    'get/getPharmacyList', // action type
    async ({id}, { rejectWithValue }) => {
      try {
        const URL = `http://127.0.0.1:5000/api/related-items-fields/${id}`;
        const response = await axios.get(URL); // Removed the Authorization header
        return response.data; // return the response data
      } catch (error) {
        // If the request fails, return a custom error message
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
  export const getQueueListData = createAsyncThunk(
    'get/getQueueList', // action type
    async ({id}, { rejectWithValue }) => {
      try {
        const URL = `http://127.0.0.1:5000/api/HMS_QUEUE/getqueue/${id}`;
        const response = await axios.get(URL); // Removed the Authorization header
        return response.data; // return the response data
      } catch (error) {
        // If the request fails, return a custom error message
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
const getSlice = createSlice({
    name:'getSlice',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        
        .addCase(getPharmacyListData.pending, (state, action) => {
            state.getPharmacyListStatus = 'loading'
            state.getPharmacyListLoading = true
            state.getPharmacyList = []
        
        })
        .addCase(getPharmacyListData.fulfilled, (state, action) => {
            state.getPharmacyListStatus = 'succeeded'
            state.getPharmacyListLoading = false
            state.getPharmacyList = action.payload.data
           
        })
        .addCase(getPharmacyListData.rejected, (state, action) => {
            state.getPharmacyListStatus = 'failed'
            state.getPharmacyListLoading = false
            state.error = action.error.message
            state.getPharmacyList = []
        })
        .addCase(getQueueListData.pending, (state, action) => {
          state.getQueueListStatus = 'loading'
          state.getQueueListLoading = true
          state.getQueueList = {}
      
      })
      .addCase(getQueueListData.fulfilled, (state, action) => {
          state.getQueueListStatus = 'succeeded'
          state.getQueueListLoading = false
          state.getQueueList = action.payload.data
         
      })
      .addCase(getQueueListData.rejected, (state, action) => {
          state.getQueueListStatus = 'failed'
          state.getQueueListLoading = false
          state.error = action.error.message
          state.getQueueList = {}
      })
    }
})
export default getSlice.reducer



