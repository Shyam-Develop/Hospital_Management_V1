import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    listviewRowData:[],
    listviewColumnData:[],
    loading:false,
    status: 'idle', // 'idle' | 'loading' 'suceeded' | 'failed
    error:null
}

export const fetchListview = createAsyncThunk('page/listview', async({accessID,screenName,filter,any}) => {
    const URL =  process.env.REACT_APP_LISTVIEW_URL 
    try{
        const data = JSON.stringify({
            Query: {
                AccessID: accessID,
                ScreenName: screenName,
                Filter: filter,
                Any: any,
            },
        }); 
        const response = await axios.get(URL,{
            params: {
                data
              },
              headers: {
                Authorization:
                 "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU",
             
              },
        })
        console.log("🚀 ~ file: listviewSlice.js:32 ~ fetchListview ~ response:", response)
        return response.data.Data
    }catch (err){
        return err.message
    }
})


export const getLocalListview = createAsyncThunk('page/getLocalListview', async({url}) => {
    // const URL =  process.env.REACT_APP_LISTVIEW_URL 
    try{
        const response = await axios.get(url)
        console.log("🚀 ~ file: listviewSlice.js:32 ~ fetchListview ~ response:", response)
        return response.data
    }catch (err){
        return err.message
    }
})


export const getPatientsListview = createAsyncThunk(
    'get/getPatientsListview', // action type
    async (_, { rejectWithValue }) => {
      try {
        const URL = "http://127.0.0.1:5000/api/patient";
        const response = await axios.get(URL); // Removed the Authorization header
        return response.data; // return the response data
      } catch (error) {
        // If the request fails, return a custom error message
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );



const listviewSlice = createSlice({
    name:'listview',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchListview.pending, (state, action) => {
            state.status = 'loading'
            state.loading = true
            state.listviewColumnData = []
            state.listviewRowData = []
        })
        .addCase(fetchListview.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.loading = false
            state.listviewColumnData = []
            state.listviewRowData =  []
        })
        .addCase(fetchListview.rejected, (state, action) => {
            state.status = 'failed'
            state.loading = false
            state.error = action.error.message
            state.listviewColumnData = []
            state.listviewRowData = []
        })
        .addCase(getLocalListview.pending, (state, action) => {
            state.status = 'loading'
            state.loading = true
            state.listviewColumnData = []
            state.listviewRowData = []
        })
        .addCase(getLocalListview.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.loading = false
            state.listviewColumnData = []
            state.listviewRowData =  action.payload
        })
        .addCase(getLocalListview.rejected, (state, action) => {
            state.status = 'failed'
            state.loading = false
            state.error = action.error.message
            state.listviewColumnData = []
            state.listviewRowData = []
        })
        .addCase(getPatientsListview.pending, (state, action) => {
            state.status = 'loading'
            state.loading = true
            state.listviewColumnData = []
            state.listviewRowData = []
        })
        .addCase(getPatientsListview.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.loading = false
            state.listviewColumnData = []
            state.listviewRowData =  action.payload
        })
        .addCase(getPatientsListview.rejected, (state, action) => {
            state.status = 'failed'
            state.loading = false
            state.error = action.error.message
            state.listviewColumnData = []
            state.listviewRowData = []
        })
    }
})
export default listviewSlice.reducer



