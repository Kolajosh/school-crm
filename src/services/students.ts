import { endpoints, REQUEST_METHODS } from "@/constants";
import { apiSlice } from "@/store/slices";
import { IResponseBody } from "@/types";

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role: "student" | string;
};

export type Student = {
  id: number;
  phone: string;
  date_of_birth: string;
  address: string;
  gender: "male" | "female" | string;
  created_at: string;
  updated_at: string;
  parent_id: number | null;
  user_id: number;
  user: User;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParentOption = any;

export type DropdownData = {
  genders: GenderOption[];
  parents: ParentOption[];
};

export type GenderOption = {
  value: "male" | "female" | "other";
  label: string;
};

export const studentsService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: endpoints.students.getStudents,
        method: REQUEST_METHODS.GET,
      }),
      transformResponse: (response: IResponseBody<Student[]>) => response,
    }),

    addStudent: builder.mutation({
      query: (data) => ({
        url: endpoints.students.addStudent,
        method: REQUEST_METHODS.POST,
        body: data,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: IResponseBody<any>) => response,
    }),

    getQualificationAndSpecializationDropdown: builder.query({
      query: () => ({
        url: endpoints.students.getQualificationAndSpecializationDropdown,
        method: REQUEST_METHODS.GET,
      }),
      transformResponse: (response: IResponseBody<DropdownData>) => response,
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetQualificationAndSpecializationDropdownQuery,
  useGetStudentsQuery,
} = studentsService;
