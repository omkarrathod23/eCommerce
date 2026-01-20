import { apiSlice } from "../api/apiSlice";
import { API_BASE_URL } from "../api/config";

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${API_BASE_URL}/api/category/add`,
        method: "POST",
        body: data,
      }),
    }),
    getShowCategory: builder.query({
      query: () => `${API_BASE_URL}/api/category/show`
    }),
    getProductTypeCategory: builder.query({
      query: (type) => `${API_BASE_URL}/api/category/show/${type}`
    }),
  }),
});

export const {
 useAddCategoryMutation,
 useGetProductTypeCategoryQuery,
 useGetShowCategoryQuery,
} = categoryApi;
