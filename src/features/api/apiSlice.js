import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({

    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"https://ic-blog-api.vercel.app"}),
    endpoints:(builder)=>({
        // Get all users
        getUsers : builder.query({
            query: ()=> "/api/user/top-authors"
        }),
        // Get Single user
        getUser : builder.query({
            query: (id)=> `/api/user/details/${id}`
        }),
        // Get all blogs
        getBlogs: builder.query({
            query:(data)=> {
                if(data.popular){
                    return `/api/blog/popular-blogs`
                }if(data.category){
                    return `/api/blog/category/${data.category}`
                }if(data.userID){
                    return `/api/blog/author/${data.userID}`
                }
                return "/api/blog/all-blog"
            }
        }),
        // Get single blog
        getBlog: builder.query({
            query:(id)=> `/api/blog/single-blog/${id}`
        }),
        // Get blog categories
        getBlogCategories: builder.query({
            query:()=> `/api/blog/categories`
        }),
        createBlog: builder.mutation({
            query:(data)=> ({
                url:`/api/blog/create-blog`,
                method:"POST",
                body:JSON.stringify(data)
            })
        }),
        relatedBlogs: builder.query({
            query:(category)=> `/api/blog/category/${category}`
        }),
      registerUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),
      loginUser: builder.query({
      query: ({ email, password }) =>
        `users?email=${email}&password=${password}`,
    }),
        
        
    })
})

export default apiSlice
export const {useGetUsersQuery,useGetUserQuery,useGetBlogsQuery, useGetBlogQuery, useGetBlogCategoriesQuery , useCreateBlogMutation, useRelatedBlogsQuery,useRegisterUserMutation,
  useLoginUserQuery, } = apiSlice

 

