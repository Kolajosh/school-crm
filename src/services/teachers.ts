import { endpoints, REQUEST_METHODS } from "@/constants";
import { apiSlice } from "@/store/slices";
import { IResponseBody, Qualification, SubjectSpecialty } from "@/types";

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

export interface ITeacherData {
  user: {
    id: number;
    name: string;
    email: string;
  };
  teacher: {
    id: number;
    subject_specialty: string;
    qualification: string;
  };
  generated_password: string;
}

interface IDropdownOptionsData {
  subject_specialties: Record<SubjectSpecialty, string>;
  qualifications: Record<Qualification, string>;
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

    getTeacherQualificationAndSpecialization: builder.query({
      query: () => ({
        url: endpoints.teachers.getQualificationAndSpecializationDropdown,
        method: REQUEST_METHODS.GET,
      }),
      transformResponse: (response: IResponseBody<IDropdownOptionsData>) =>
        response,
    }),

    addNewTeacher: builder.mutation({
      query: (values) => ({
        url: endpoints.teachers.addTeacher,
        method: REQUEST_METHODS.POST,
        body: values,
      }),
      transformResponse: (response: IResponseBody<ITeacherData>) => response,
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherQualificationAndSpecializationQuery,
  useAddNewTeacherMutation,
} = teachersService;
