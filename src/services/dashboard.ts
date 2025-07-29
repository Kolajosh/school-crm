import { endpoints, REQUEST_METHODS } from "@/constants";
import { apiSlice } from "@/store/slices";
import { IResponseBody } from "@/types";

export interface DashboardTotals {
  students: number;
  teachers: number;
  classes: number;
}

export interface AttendanceToday {
  present: number;
  absent: number;
  late: number;
  total: number;
}

export interface RecentActivity {
  id: number;
  type: string;
  title: string;
  time: string;
}

export interface IDashboardData {
  totals: DashboardTotals;
  attendance_today: AttendanceToday;
  recent_activities: RecentActivity[];
}

export const dashboardService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: () => ({
        url: endpoints.dasboard.adminDashboard,
        method: REQUEST_METHODS.GET,
      }),
      transformResponse: (response: IResponseBody<IDashboardData>) => response,
    }),
  }),
});

export const { useGetAdminDashboardQuery } = dashboardService;
