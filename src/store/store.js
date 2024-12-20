import { configureStore } from '@reduxjs/toolkit'
import { authSlice, diarioSlice } from './slices'

export const store = configureStore({
  
    reducer: {
        auth:authSlice.reducer,
        diario:diarioSlice.reducer,
       
    },
       
})