import { APP_PATHS } from "@/constants";
import {
  BookAIcon,
  BookAlert,
  Briefcase,
  CheckCheck,
  HomeIcon,
  School2,
  User2Icon,
  UserCircle2,
  UserPlus,
  UserRoundPlus,
  Users2,
} from "lucide-react";

export const dashboardNavigation = [
  {
    title: "Dashboard",
    url: APP_PATHS.DASHBOARD,
    icon: HomeIcon,
  },
  {
    title: "Classes",
    url: "#",
    icon: School2,
  },
  {
    title: "Subject",
    url: "#",
    icon: BookAIcon,
  },
  {
    title: "Students",
    url: "#",
    icon: User2Icon,
    sub: [
      {
        title: "All Students",
        url: APP_PATHS.STUDENTS,
        icon: UserCircle2,
      },
      {
        title: "Add Students",
        url: APP_PATHS.STUDENTS_ADD,
        icon: UserRoundPlus,
      },
    ],
  },
  {
    title: "Employees",
    url: APP_PATHS.EMPLOYEES,
    icon: Briefcase,
    sub: [
      {
        title: "All Employees",
        url: APP_PATHS.EMPLOYEES,
        icon: Users2,
      },
      {
        title: "Add Employees",
        url: APP_PATHS.EMPLOYEES_ADD,
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Attendance",
    url: "#",
    icon: CheckCheck,
  },
  {
    title: "Assignment",
    url: "#",
    icon: BookAlert,
  },
];
