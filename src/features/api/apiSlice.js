import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from './../utils/getToken';

// Create the main API slice
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ic-blog-api.vercel.app/api" }),
    tagTypes: ["blog"],
    endpoints: (builder) => ({

        // ----------------- USERS -----------------

        // Get top authors
        getTopUsers: builder.query({
            query: () => "/user/top-authors"
        }),

        // Get single user by ID
        getUser: builder.query({
            query: (id) => `/user/details/${id}`
        }),
        //Get all user for admin
        getAllUsersAdmin: builder.query({
            query: () => ({
                url: `/user/all-user`,
                headers: {
                    ...getToken()
                }
            }
            )
        }),
        //Update User Data
        updateUser: builder.mutation({
            query: ({ data, id }) => ({
                url: `/user/update/${id}`,
                method: "PUT",
                body: data,
                headers: {
                    ...getToken()
                }
            })
        }),
        //Suspend user
        suspendUser: builder.mutation({
            query: ({ id }) => ({
                url: `/user/suspend/${id}`,
                method: "PUT",
                body: {
                    "isSuspended": "suspend"
                },
                headers: {
                    ...getToken()
                }
            })
        }),
        //Delete User
         deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/user/delete/${id}`,
                method: "DELETE",
               
                headers: {
                    ...getToken()
                }
            })
        }),
        // ----------------- BLOGS -----------------

        // Get paginated or all blogs
        getBlogs: builder.query({
            query: ({ page, limit, category }) => {
                if (limit && page) {
                    return `/blog/all-blog/pagination?page=${page}&limit=${limit}`;
                }
                if (category) {
                    return `/blog/category/${category}`;
                }
                return "/blog/all-blog";
            },
            providesTags: ["blog"] // Used for cache invalidation
        }),
        getBlogByAuthor: builder.query({
            query: (userId) => {
                if (userId) {
                    return `/blog/author/${userId}`;
                }

            },
            providesTags: ["blog"] // Used for cache invalidation
        }

        ),

        //get popular blog
        getPopularBlogs: builder.query({
            query: () => "/blog/popular-blogs"
        }),


        // Get blogs for admin view (with token)
        getBlogsAdmin: builder.query({
            query: (data) => {
                const token = getToken();
                const url = (data?.limit && data?.page)
                    ? `/blog/all-blog/pagination/admin?page=${data.page}&limit=${data.limit}`
                    : "/blog/all-blog/pagination/admin";
                return {
                    url,
                    headers: {
                        ...token
                    }
                };
            }
        }),

        // Get single blog (public)
        getBlog: builder.query({
            query: (id) => `/blog/single-blog/${id}`
        }),

        // Get single blog (admin - requires token)
        getBlogAdmin: builder.query({
            query: (id) => ({
                url: `/blog/single-blog/admin/${id}`,
                headers: {
                    ...getToken()
                }
            })
        }),

        // Create a new blog
        createBlog: builder.mutation({
            query: (data) => ({
                url: `/blog/create-blog`,
                method: "POST",
                body: data,
                headers: {
                    ...getToken()
                }
            }),
            invalidatesTags: ["blog"]
        }),

        // Update an existing blog
        editBlog: builder.mutation({
            query: ({ id, data }) => {

                return {
                    url: `/blog/update-blog/${id}`,
                    method: "PUT",
                    body: { ...data },
                    headers: {
                        ...getToken()
                    }
                };
            },
            invalidatesTags: ["blog"]
        }),


        // Soft delete a blog
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blog/soft-delete-blog/${id}`,
                method: "PUT",
                body: JSON.stringify({ isDeleted: true }),
                headers: {
                    ...getToken()
                }
            }),
            invalidatesTags: ["blog"]
        }),
        // Delete for admin
        deleteBlogAdmin: builder.mutation({
            query: (id) => ({
                url: `/blog/delete-blog/${id}`,
                method: "Delete",
                headers: {
                    ...getToken()
                }
            }),
            invalidatesTags: ["blog"]
        }),
        // Get all blog categories
        getAllCategories: builder.query({
            query: () => "/blog/categories"
        }),

        // Get related blogs by category
        relatedBlogs: builder.query({
            query: (category) => `/blog/category/${category}`
        }),

        // ----------------- AUTH -----------------

        // Register a new user
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser
            })
        }),

        // Login user
        loginUser: builder.mutation({
            query: ({ email, password }) => ({
                url: "/auth/login",
                method: "POST",
                body: { email, password }
            })
        }),
        //verify email
        verifyEmail: builder.mutation({
            query: ({ userId, code }) => ({

                url: `/auth/verify/${userId}`,
                method: "POST",
                body: { token: code }
            })
        }),

    })
})


export const {
    useGetUsersQuery,
    useGetTopUsersQuery,
    useGetUserQuery,
    useGetBlogsQuery,
    useGetBlogsAdminQuery,
    useGetBlogQuery,
    useGetBlogAdminQuery,
    useCreateBlogMutation,
    useEditBlogMutation,
    useDeleteBlogMutation,
    useGetAllCategoriesQuery,
    useGetBlogCategoriesQuery,
    useRelatedBlogsQuery,
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetPopularBlogsQuery,
    useVerifyEmailMutation,
    useGetBlogByAuthorQuery,
    useDeleteBlogAdminMutation,
    useGetAllUsersAdminQuery,
    useUpdateUserMutation,
    useSuspendUserMutation,
    useDeleteUserMutation

} = apiSlice;
