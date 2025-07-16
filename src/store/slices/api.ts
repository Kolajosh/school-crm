import { APIM_SUB_KEY, BASE_API_URL } from "@/constants";
import { getCookie, handleLogoutRedirect } from "@/utils";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const refreshPromise: Promise<void> | null = null;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_API_URL}`,
  credentials: "same-origin",
  prepareHeaders: (headers) => {
    const token = getCookie("_tk");
    headers.set("Access-Control-Allow-Origin", "*");
    if (APIM_SUB_KEY) {
      headers.set("Ocp-Apim-Subscription-Key", APIM_SUB_KEY);
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, unknown, object>;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  // If a refresh is in progress, wait for it before proceeding with other api calls
  if (refreshPromise) {
    await refreshPromise;
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as { status?: number }).status === 401) {
    handleLogoutRedirect();
  }

  if (result.error && (result.error as { status?: number }).status === 401) {
    handleLogoutRedirect();
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api-slice",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
});
