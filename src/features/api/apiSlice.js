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
            query:(data)=> {
                if(data.limit){
                    return `blogs?_limit=${data.limit}`
                }if(data.category){
                    return `blogs?category=${data.category}`
                }
                return "blogs"
            }
        }),
        
    })
})

export default apiSlice
export const {useGetUsersQuery,useGetUserQuery,useGetBlogsQuery} = apiSlice