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
        getBlogsAdmin: builder.query({
            query: (data) => {
                const token = getToken();
                console.log(token)
                const url = (data.limit && data.page)
                    ? `blog/all-blog/pagination/admin?page=${data.page}&limit=${data.limit}`
                    : "blogs";

                return {
                    url,
                    headers: {
                        ...token
                    }
                };
            }
        }),

        getBlog: builder.query({
            query: (id) => `blog/single-blog/${id}`
        }),
        getBlogAdmin: builder.query({
            query: (id) => {
                return {
                    url: `blog/single-blog/admin/${id}`,
                    headers: {
                        ...getToken()
                    }
                };
            }
        }),
        updateBlog: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `blog/update-blog/${id}`,
                method: "PUT",
                body: data,
                headers: {
                    ...getToken()
                }
            })
        }),
        getAllCategories: builder.query({
            query: () => "blog/categories"
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
    useLoginUserMutation, useGetBlogsAdminQuery, useGetBlogAdminQuery, useUpdateBlogMutation,useGetAllCategoriesQuery } = apiSlice



