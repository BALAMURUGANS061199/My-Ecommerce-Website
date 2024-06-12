import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Create the API

export const appAPI = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: user => ({
                url: '/user/Signup',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: user => ({
                url: 'user/login',
                method: 'POST',
                body: user
            }),
        }),
        //Create Product
        CreateProduct: builder.mutation({
            query: (product) => ({
                url: 'product/addproduct',
                method: 'POST',
                body: product,

            })
        })

    }),

})


export const { useSignupMutation, useLoginMutation, useCreateProductMutation } = appAPI

export default appAPI;