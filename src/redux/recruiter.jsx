import { createSlice} from '@reduxjs/toolkit'
const initialState = {
    recuiter: null,
    name: null,
    token: null,
};

export const recuiterSlice =createSlice({
    name:'recuiterDetails',
    initialState,
    reducers:{
        recuiterLogin:(state, action)=>{
      state.recuiter = action.payload.recuiter;
      state.name = action.payload.name;
      state.token = action.payload.token;
      
        },
        recuiterLogout: (state, action) =>{
            state.recuiter = null;
            state.name = null;
            state.token = null;
            
      }
    }
})
export const {recuiterLogin, recuiterLogout} = recuiterSlice.actions;
export default recuiterSlice.reducer;