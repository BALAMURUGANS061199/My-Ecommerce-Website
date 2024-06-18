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
        }),
        //add To cart
        AddToCart:builder.mutation({
            query:(cartinfo)=>({
                url:'/product/add-to-cart',
                body:cartinfo,
                method:'POST',
            })
        }),
        RemoveFromCart:builder.mutation({
            query:(body)=>({
                url:'/product/remove-from-cart',
                body,
                method:'DELETE',
                
            })
        }),
        increaseCartProduct:builder.mutation({
            query:(body)=>({
                url:'/product/increase-cart',
                body,
                method:'POST'
            })
        }),
        decreaseCartProduct:builder.mutation({
            query:(body)=>({
                url:'/product/decrease-cart',
                body,
                method:'POST'
            })
        })

    }),

})


export const { useSignupMutation, useLoginMutation, useCreateProductMutation,
   useAddToCartMutation,useIncreaseCartProductMutation,useDecreaseCartProductMutation,useRemoveFromCartMutation } = appAPI

export default appAPI;