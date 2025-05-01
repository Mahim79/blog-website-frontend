import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:4000/"}),
    endpoints:(builder)=>({
        getUsers : builder.query({
            query: ()=> "users"
        }),
        getUser : builder.query({
            query: (id)=> `users/${id}`
        }),
        getBlogs: builder.query({
            query:(limit)=> {
                if(limit){
                    return `blogs?_limit=${limit}`
                }
                return "blogs"
            }
        })
    })
})

export default apiSlice
export const {useGetUsersQuery,useGetUserQuery,useGetBlogsQuery} = apiSlice