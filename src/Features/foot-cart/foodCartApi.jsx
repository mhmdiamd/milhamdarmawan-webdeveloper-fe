import { apiSlice } from "../../Api/authApi";

export const foodCartApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints : (builder) => ({

    createFoodCart : builder.mutation({
      query: ({data}) => ({
        url: 'food-carts',
        method: "POST",
        body: data
      }),

      transformResponse: (response, meta, args) => response.data
    }),

 
  })
})

export const { useCreateFoodCartMutation } = foodCartApi