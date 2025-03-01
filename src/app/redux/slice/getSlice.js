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
   getQueueListStatus:'idle',
   getDoctorList:[],
   getDoctorStatus:'idle',
   getDoctorLoading:false,
   getDoctorError:null,
   getPatientList:[],
   getPatientStatus:'idle',
   getPatientLoading:false,
   getPatientError:null,
   getDoctorData:{},
   getDoctorDataStatus:'idle',
   getDoctorDataLoading:false,
   getDoctorDataError:null,
   getPatientData:{},
   getPatientDataStatus:'idle',
   getPatientDataLoading:false,
   getPatientDataError:null,
   getPaymentData:{},
   getPaymentDataStatus:'idle',
   getPaymentDataLoading:false,
   getPaymentDataError:null,
  


   
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
  export const getDoctorListData = createAsyncThunk(
    'get/getDoctorList', // action type
    async ( _,{ rejectWithValue }) => {
      try {
        const URL = `http://127.0.0.1:5000/api/doctor`;
        const response = await axios.get(URL); // Removed the Authorization header
        return response.data; // return the response data
      } catch (error) {
        // If the request fails, return a custom error message
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
  export const getPatientListData = createAsyncThunk(
    'get/getPatientList', // action type
    async ( _,{ rejectWithValue }) => {
      try {
        const URL = `http://127.0.0.1:5000/api/patient`;
        const response = await axios.get(URL); // Removed the Authorization header
        return response.data; // return the response data
      } catch (error) {
        // If the request fails, return a custom error message
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
  export const getDoctor = createAsyncThunk(
    'get/getDoctor', // action type
    async ( {id},{ rejectWithValue }) => {
      try {
        const URL = `http://127.0.0.1:5000/api/getdoctor/${id}`;
        const response = await axios.get(URL); // Removed the Authorization header
        return response.data; // return the response data
      } catch (error) {
        // If the request fails, return a custom error message
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
  export const getPatient = createAsyncThunk(
    'get/getPatient', // action type
    async ( {id},{ rejectWithValue }) => {
      try {
        const URL = `http://127.0.0.1:5000/api/getpatient/${id}`;
        const response = await axios.get(URL); // Removed the Authorization header
        return response.data; // return the response data
      } catch (error) {
        // If the request fails, return a custom error message
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
  export const getPayment= createAsyncThunk(
    'get/getPayment', // action type
    async ( {id},{ rejectWithValue }) => {
      try {
        const URL = `http://127.0.0.1:5000/header/getheader/P/${id}`;
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
      .addCase(getDoctorListData.pending, (state, action) => {
        state.getDoctorStatus = 'loading'
        state.getDoctorLoading = true
        state.getDoctorList = []
    
    })
    .addCase(getDoctorListData.fulfilled, (state, action) => {
        state.getDoctorStatus = 'succeeded'
        state.getDoctorLoading = false
        state.getDoctorList = action.payload.data
       
    })
    .addCase(getDoctorListData.rejected, (state, action) => {
        state.getDoctorStatus = 'failed'
        state.getDoctorLoading = false
        state.getDoctorError = action.error.message
        state.getDoctorList = []
    })
    .addCase(getPatientListData.pending, (state, action) => {
      state.getPatientStatus = 'loading'
      state.getPatientLoading = true
      state.getPatientList = []
  
  })
  .addCase(getPatientListData.fulfilled, (state, action) => {
      state.getPatientStatus = 'succeeded'
      state.getPatientLoading = false
      state.getPatientList = action.payload.data
     
  })
  .addCase(getPatientListData.rejected, (state, action) => {
      state.getPatientStatus = 'failed'
      state.getPatientLoading = false
      state.getPatientError = action.error.message
      state.getPatientList = []
  })
  .addCase(getDoctor.pending, (state, action) => {
    state.getDoctorDataStatus = 'loading'
    state.getDoctorDataLoading = true
    state.getDoctorData = {}

})
.addCase(getDoctor.fulfilled, (state, action) => {
    state.getDoctorDataStatus = 'succeeded'
    state.getDoctorDataLoading = false
    state.getDoctorData = action.payload.data
   
})
.addCase(getDoctor.rejected, (state, action) => {
    state.getDoctorDataStatus = 'failed'
    state.getDoctorDataLoading = false
    state.getDoctorDataError = action.error.message
    state.getDoctorData = {}
})
.addCase(getPatient.pending, (state, action) => {
  state.getPatientDataStatus = 'loading'
  state.getPatientDataLoading = true
  state.getPatientData = {}

})
.addCase(getPatient.fulfilled, (state, action) => {
  state.getPatientDataStatus = 'succeeded'
  state.getPatientDataLoading = false
  state.getPatientData = action.payload.data
 
})
.addCase(getPatient.rejected, (state, action) => {
  state.getPatientDataStatus = 'failed'
  state.getPatientDataLoading = false
  state.getPatientDataError = action.error.message
  state.getPatientData = {}
})
.addCase(getPayment.pending, (state, action) => {
  state.getPaymentDataStatus = 'loading'
  state.getPaymentDataLoading = true
  state.getPaymentData = {}

})
.addCase(getPayment.fulfilled, (state, action) => {
  state.getPaymentDataStatus = 'succeeded'
  state.getPaymentDataLoading = false
  state.getPaymentData = action.payload.data
 
})
.addCase(getPayment.rejected, (state, action) => {
  state.getPaymentDataStatus = 'failed'
  state.getPaymentDataLoading = false
  state.getPaymentError = action.error.message
  state.getPaymentData = {}
})
    



}
})
export default getSlice.reducer



