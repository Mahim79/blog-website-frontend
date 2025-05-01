import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({

  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),

    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),
    getBlogs: builder.query({
      query: (data) => {
        if (data.limit) {
          return `blogs?_limit=${data.limit}`;
        }if(data.category)
        return `blogs?category=${data.category}`;
      },
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
  }),
});

export default apiSlice;
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetBlogsQuery,
  useRegisterUserMutation,
  useLoginUserQuery, // ✅ Correct hook name
} = apiSlice;
