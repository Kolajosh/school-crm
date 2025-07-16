import { endpoints, REQUEST_METHODS } from "@/constants";
import { apiSlice } from "@/store/slices";
import { IAuthResponse } from "@/types";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: endpoints.auth.login,
        method: REQUEST_METHODS.POST,
        body: values,
      }),
      transformResponse: (response: IAuthResponse) => response,
    }),
  }),
});

export const { useLoginMutation } = authService;
