import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from './../utils/getToken';

const apiSlice = createApi({

    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ic-blog-api.vercel.app/api/" }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "users",
                method: "GET",
                // headers: getToken(),
            })
        }),
        getUser: builder.query({
            query: (id) => `user/details/${id}`
        }),
        getBlogs: builder.query({
            query: (data) => {
                if (data.limit && data.page) {
                    return `blog/all-blog/pagination?page=${data.page}&limit=${data.limit}`
                }
                return "blogs"
            }
        }),
        getBlog: builder.query({
            query: (id) => `blog/single-blog/${id}`
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



