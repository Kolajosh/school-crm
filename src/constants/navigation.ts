import {
  Brief,
  ClassesIcon,
  Home,
  Homework,
  Profile,
  SubjectIcon,
  Thumbs,
} from "@/assets";
import { APP_PATHS } from "@/constants";

export const dashboardNavigation = [
  {
    title: "Dashboard",
    url: APP_PATHS.DASHBOARD,
    icon: Home,
  },
  {
    title: "Classes",
    url: "#",
    icon: ClassesIcon,
  },
  {
    title: "Subject",
    url: "#",
    icon: SubjectIcon,
  },
  {
    title: "Students",
    url: "#",
    icon: Profile,
  },
  {
    title: "Employees",
    url: APP_PATHS.EMPLOYEES,
    icon: Brief,
    sub: [
      {
        title: "All Employees",
        url: APP_PATHS.EMPLOYEES,
        icon: Brief,
      },
      {
        title: "Add Employees",
        url: APP_PATHS.EMPLOYEES_ADD,
        icon: Brief,
      },
    ],
  },
  {
    title: "Attendance",
    url: "#",
    icon: Thumbs,
  },
  {
    title: "Assignment",
    url: "#",
    icon: Homework,
  },
];
