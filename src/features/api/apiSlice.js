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
                }if(data.userID){
                    return `blogs?userID=${data.userID}`
                }
                return "blogs"
            }
        }),
        getBlog: builder.query({
            query:(id)=> `blogs/${id}`
        }),
        relatedBlogs: builder.query({
            query:(category)=> `blogs?category=${category}`
        }),
        // getLikesByPostId: builder.query({
        //     query: (blogID) => `/likes?_blogID=${blogID}`,
            
        // }),
        // likeBlog: builder.mutation({
        //     query:(data)=>({
        //         url: "likes",
        //         method:"POST",
        //         data
        //     })
        // }),
        // disLikeBlog: builder.mutation({
        //     query:(data)=>({
        //         url: "likes",
        //         method:"DELETE",
        //         data
        //     })
        // }),
        
    })
})

export default apiSlice
export const {useGetUsersQuery,useGetUserQuery,useGetBlogsQuery, useGetBlogQuery,useGetLikesByPostIdQuery,useLikeBlogMutation,useDisLikeBlogMutation, useRelatedBlogsQuery} = apiSlice