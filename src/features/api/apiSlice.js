import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({

    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ic-blog-api.vercel.app/api/" }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "users"
        }),
        getUser: builder.query({
            query: (id) => `users/${id}`
        }),
        getBlogs: builder.query({
            query: (data) => {
                if (data.limit) {
                    return `blogs?_limit=${data.limit}`
                } if (data.category) {
                    return `blogs?category=${data.category}`
                } if (data.userID) {
                    return `blogs?userID=${data.userID}`
                }
                return "blogs"
            }
        }),
        getBlog: builder.query({
            query: (id) => `blogs/${id}`
        }),
        relatedBlogs: builder.query({
            query: (category) => `blogs?category=${category}`
        }),
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser,
            }),
        }),
        loginUser: builder.mutation({
            query: ({ email, password }) =>
            ({
                url: "auth/login",
                method: "POST",
                body: { email, password }
            })
        })
    }),


})


export default apiSlice
export const { useGetUsersQuery, useGetUserQuery, useGetBlogsQuery, useGetBlogQuery, useRelatedBlogsQuery, useRegisterUserMutation,
    useLoginUserMutation, } = apiSlice



