export const BASE_API_URL =
  process.env.NODE_ENV === "development"
    ? "https://skoo-7586ac974046.herokuapp.com/api"
    : process.env.NEXT_PUBLIC_API_BASE_URL!;

export const APIM_SUB_KEY = process.env.NEXT_PUBLIC_SUB_KEY || "";

export const REQUEST_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  TRACE: "TRACE",
  CONNECT: "CONNECT",
};

export const endpoints = {
  auth: {
    login: "/login",
    register: "/register",
  },
  dasboard: {
    adminDashboard: "/admin/dashboard",
  },
  teachers: {
    getTeachers: "/teachers",
    getQualificationAndSpecializationDropdown: "/teachers/dropdown-options",
    addTeacher: "/teachers",
  },
};
