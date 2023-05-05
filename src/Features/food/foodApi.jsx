import { apiSlice } from "../../Api/authApi";

export const foodApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  tagTypes: ['getAllMenu'],
  endpoints : (builder) => ({
    getAllMenu : builder.query({
      query: () => ({
        url: 'foods'
      }),

      // Provide cache management
      providesTags: ['getAllMenu'],
      transformResponse: (response, meta, args) => response.data
    }),
    createMenu : builder.mutation({
      query: ({data}) => ({
        url: 'foods',
        method: "POST",
        body: data
      }),

      invalidatesTags: ['getAllMenu'],
      transformResponse: (response, meta, args) => response.data
    }),

    deleteMenu : builder.mutation({
      query: ({id_food}) => ({
        url: `foods/${id_food}`,
        method: "DELETE",
      }),

      invalidatesTags: ['getAllMenu'],
      transformResponse: (response, meta, args) => response.data
    })
  })
})

export const { useGetAllMenuQuery, useCreateMenuMutation, useDeleteMenuMutation } = foodApi