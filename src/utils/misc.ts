import { APP_PATHS, MAX_COOKIES_AGE } from "@/constants";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
// Extend dayjs with duration plugin
dayjs.extend(duration);
dayjs.extend(utc);

export const getCookie = (name: string) => {
  try {
    const value = typeof window !== "undefined" ? `; ${document.cookie}` : "";
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const part = parts.pop()?.split(";").shift();
      return part ? decodeURIComponent(part) : null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * @param cname
 * @param cvalue
 */
export const setCookie = (cname: string, cvalue: string, age?: number) => {
  if (typeof window !== "undefined") {
    document.cookie = `${cname}=${encodeURIComponent(cvalue)};max-age=${
      age || MAX_COOKIES_AGE
    };Secure;SameSite=Strict;path=/`;
  }
};

/**
 * @param cname
 */
export const expireCookie = (cname: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${cname}=;max-age=0;Secure;SameSite=Strict;path=/`;
  }
};

export const handleLogoutRedirect = () => {
  if (typeof window !== "undefined") {
    expireCookie("_tk");
    expireCookie("_rtk");
    expireCookie("_ar");
    window.location.replace(APP_PATHS.LOGIIN);
  }
};

export { dayjs as dayJs };

/**
 * Extract a user-friendly error message from an error object
 * @param error - The error object
 * @returns {string} - The extracted error message
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any): string => {
  const responseData = error?.response?.data || error?.data;

  // Handle field-level validation errors like `errors: { email: [...] }`
  const fieldErrors = responseData?.errors;
  if (fieldErrors && typeof fieldErrors === "object") {
    const messages = Object.values(fieldErrors).flat().filter(Boolean);
    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return (
    responseData?.message || // e.g. "Invalid credentials"
    responseData?.title || // fallback title
    (typeof responseData === "string"
      ? responseData
      : error?.response?.statusText) ||
    error?.message ||
    "An unknown error occurred"
  );
};
