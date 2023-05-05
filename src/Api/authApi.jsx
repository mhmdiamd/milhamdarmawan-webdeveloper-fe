import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ENDPOINT,
  credentials: 'same-origin',
}); 

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
