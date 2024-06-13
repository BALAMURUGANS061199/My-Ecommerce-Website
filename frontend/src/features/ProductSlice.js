import {createSlice} from '@reduxjs/toolkit'

//appApi
import appApi from '../services/appApi'


const initialState =[]
const ProductSlice = createSlice({
    name:'product',
    initialState: initialState,
    reducers:{
        updateProducts:(state,action)=>{
            return action.payload;
        },

    },
})

export const {updateProducts} = ProductSlice.actions;

export default ProductSlice.reducer;