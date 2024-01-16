import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    username:'',
    role:'',
    isAuthenticated: false,
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        storeUser:(state,action) => {
            const {username, role,isAuthenticated}= action.payload;
            state.username=username;
            state.role=role;
            state.isAuthenticated=isAuthenticated
        }
    }
})
export const {storeUser} = loginSlice.actions;
export default loginSlice.reducer;