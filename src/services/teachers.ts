import { endpoints, REQUEST_METHODS } from "@/constants";
import { apiSlice } from "@/store/slices";
import { IResponseBody } from "@/types";

export interface TeacherUser {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ITeacher {
  id: number;
  user_id: number;
  phone: string;
  subject_specialty: string;
  qualification: string;
  date_of_birth: string;
  address: string;
  gender: string;
  created_at: string;
  updated_at: string;
  user: TeacherUser;
}

export const teachersService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => ({
        url: endpoints.teachers.getTeachers,
        method: REQUEST_METHODS.GET,
      }),
      transformResponse: (response: IResponseBody<ITeacher[]>) => response,
    }),
  }),
});

export const { useGetTeachersQuery } = teachersService;
