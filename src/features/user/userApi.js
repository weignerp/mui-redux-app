import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://localhost:13000";

const baseQuery = fetchBaseQuery({ baseUrl: `${URL}` });

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["user"],
  endpoints: () => ({}),
});

export default userApi;
