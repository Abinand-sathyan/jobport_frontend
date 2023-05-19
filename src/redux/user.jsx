import { createSlice} from '@reduxjs/toolkit'
const initialState = {
    user: null,
    name: null,
    token: null,
    count:null,
  };

export const userSlice =createSlice({
    name:'userDetails',
    initialState,
    reducers:{
        userLogin:(state, action)=>{
      state.user = action.payload.user;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.count = action.payload.count;
        },
        userLogout: (state, action) =>{
            state.user = null;
            state.name = null;
            state.token = null;
            state.count = null;
      }
    }
})
export const {userLogin, userLogout} = userSlice.actions;
export default userSlice.reducer;

