import userApi from "./userAPI";

const userApiSlice = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;
