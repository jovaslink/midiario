import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: 'auth',
  //declaracion del estado inicial de las variables
  initialState: {
    statusApp: 'revisando autenticación', 
    uid:null,
    email: null,
    displayName:null,
    diplayFoto:null,
    mensajeError:null,
    },
  
reducers: {
    login: (state,action) => {
      state.statusApp='autenticado',
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName=action.payload.displayName;
      state.diplayFoto=action.payload.photoURL;
    },
    logout: (state,action) => {
      state.statusApp='no autenticado';
      state.uid=null;
      state.email=null;
      state.displayName=null;
      state.diplayFoto=null;
      state.mensajeError=action.payload?.errorMessage;
     

    },
    
    checking: (state)=>{
      state.statusApp = 'revisando autenticación';
      
    }
  },
});

export const { login,logout,checking } = authSlice.actions;
