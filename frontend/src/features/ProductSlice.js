import {createSlice} from '@reduxjs/toolkit'

//appApi
import appApi from '../services/appApi'


const initialState =[]
const ProductSlice = createSlice({
    name:'products',
    initialState: initialState,
    reducers:{},
})


export default ProductSlice.reducer;