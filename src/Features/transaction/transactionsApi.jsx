import { apiSlice } from "../../Api/authApi";

export const transactionApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints : (builder) => ({

    createTransaction : builder.mutation({
      query: ({data}) => ({
        url: 'transactions',
        method: "POST",
        body: data
      }),

      invalidatesTags: ['getAllTransaction'],
      transformResponse: (response, meta, args) => response.data
    }),

    getAllTransaction : builder.query({
      query: () => ({
        url: 'transactions',
      }),

      providesTags: ['getAllTransaction'],
      transformResponse: (response, meta, args) => response.data
    }),

 
  })
})

export const { useCreateTransactionMutation, useGetAllTransactionQuery } = transactionApi