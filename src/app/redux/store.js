import { configureStore } from "@reduxjs/toolkit";

import listviewReducer from "./slice/listviewSlice"
import priceListReducer  from "./slice/priceListSlice"

export const store = configureStore({
    reducer:{
     listview: listviewReducer,
     priceList: priceListReducer,

    }
})

