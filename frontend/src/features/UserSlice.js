import {createSlice} from "@reduxjs/toolkit"
import appAPI from '../services/appApi'

const initialState = null;

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        logout: ()=> initialState,   
    },
    extraReducers:(builder) =>{
        builder.addMatcher(appAPI.endpoints.signup.matchFulfilled,(_,{payload})=> payload);
        builder.addMatcher(appAPI.endpoints.login.matchFulfilled,(_,{payload}) =>payload);
    }
})
 
export const {logout} = UserSlice.actions
export default UserSlice.reducer;