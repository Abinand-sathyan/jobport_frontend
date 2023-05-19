import { createSlice} from '@reduxjs/toolkit'
const initialState = {
    admin: null,
    name: null,
    token: null,
};

export const adminSlice =createSlice({
    name:'adminDetails',
    initialState,
    reducers:{
      adminLogin:(state, action)=>{
      state.recuiter = action.payload.admin;
      state.name = action.payload.name;
      state.token = action.payload.token;
      
        },
        adminLogout: (state, action) =>{
            state.admin = null;
            state.name = null;
            state.token = null;
            
      }
    }
})
export const {adminLogin, adminLogout} = adminSlice.actions;
export default adminSlice.reducer;