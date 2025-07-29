import { endpoints, REQUEST_METHODS } from "@/constants";
import { apiSlice } from "@/store/slices";
import { IResponseBody } from "@/types";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type IAuthResponse = {
  user: User;
  profile: null;
  role: "admin" | string;
  access_token: string;
  token_type: string;
};

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: endpoints.auth.login,
        method: REQUEST_METHODS.POST,
        body: values,
      }),
      transformResponse: (response: IResponseBody<IAuthResponse>) => response,
    }),

    register: builder.mutation({
      query: (values) => ({
        url: endpoints.auth.register,
        method: REQUEST_METHODS.POST,
        body: values,
      }),
      transformResponse: (response: IResponseBody<IAuthResponse>) => response,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authService;
