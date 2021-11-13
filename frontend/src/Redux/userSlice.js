import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,        
    },
    reducers:{
        loginStart: (state) =>{
            state.currentUser = null;
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        loginFailure: (state) =>{
            state.currentUser = null;
            state.isFetching = false;
            state.error = true;
        },
        logout:(state)=>{
            state.isFetching = null;
            state.currentUser = null;
            state.error = false;
        },
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;