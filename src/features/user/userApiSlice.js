import userApi from "./userApi";

const userApiSlice = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (queryKey) => {
        console.log(`queryKey "${JSON.stringify(queryKey)}"`);
        let filters = queryKey.queryKey?.columnFilters || [];
        console.log(`filters "${JSON.stringify(filters)}"`);
        let qs = filters.map((item) => `${item.id}=${item.value}`).join("&");
        console.log(`getUsers /users?${qs}`);
        return `/users?${qs}`;
      },
      providesTags: ["Users"],
      transformResponse: (responseData) => {
        let mdata = responseData.map((item) => {
          return { id: item.id, name: item.name, username: item.username };
        });
        return {
          data: mdata,
          meta: { page: 0, rows: 10 },
        };
      },
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;

export default userApiSlice;
