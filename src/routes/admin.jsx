import React from "react";
import Dashboard from "@material-ui/icons/Dashboard";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Book from "@material-ui/icons/Book";
import Grade from "@material-ui/icons/Grade";
import Person from "@material-ui/icons/Person";
import SubjectIcon from "@material-ui/icons/Subject";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import SchoolIcon from "@material-ui/icons/School";
import ClassIcon from "@material-ui/icons/Class";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Loadable from "react-loadable";

const loading = () => <div></div>;

const adminRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarrName: "Material Dashboard",
    icon: Dashboard,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/Dashboard/Dashboard"),
      loading,
    }),
  },
  {
    path: "/users",
    sidebarName: "Admin Users",
    navbarName: "Admin Users",
    icon: SupervisorAccount,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/AdminUsers/admin"),
      loading,
    }),
  },
  {
    path: "/qualification",
    sidebarName: "Qualifications",
    navbarName: "Qualifications",
    icon: Book,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/Qualification/qualification"),
      loading,
    }),
  },
  {
    path: "/gradelevel",
    sidebarName: "Grade Levels",
    navbarName: "Grade Levels",
    icon: Grade,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/GradeLevel/gradeLevel"),
      loading,
    }),
  },

  {
    path: "/subject",
    sidebarName: "Subjects",
    navbarName: "Subjects",
    icon: SubjectIcon,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/Subject/subject"),
      loading,
    }),
  },
  {
    path: "/state",
    sidebarName: "State",
    navbarName: "State",
    icon: LocationCityIcon,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/State/state"),
      loading,
    }),
  },
  {
    path: "/lgaOrigin",
    sidebarName: "LGAOrigin",
    navbarName: "LGAOrigin",
    icon: LocationCityIcon,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/LgaOrigin/lga"),
      loading,
    }),
  },
  {
    path: "/school",
    sidebarName: "Schools",
    navbarName: "Schools",
    icon: SchoolIcon,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/School/school"),
      loading,
    }),
  },
  {
    path: "/class",
    sidebarName: "Classes",
    navbarName: "Classes",
    icon: ClassIcon,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/Class/class"),
      loading,
    }),
  },
  {
    path: "/teacher",
    sidebarName: "Teachers",
    navbarName: "Teachers",
    icon: Person,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/Teacher/teacher"),
      loading,
    }),
  },

  {
    path: "/posting",
    sidebarName: "Postings",
    navbarName: "Postings",
    icon: Person,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/Posting/teacher"),
      loading,
    }),
  },
  {
    path: "/posting/teacher/:id",
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/Posting/posting"),
      loading,
    }),
  },
  {
    path: "/allocation",
    sidebarName: "Allocations",
    navbarName: "Allocations",
    icon: AddCircleIcon,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/Allocation/allocation"),
      loading,
    }),
  },

  {
    path: "/lga",
    sidebarName: "LGAs",
    navbarName: "LGAs",
    icon: LocationCityIcon,
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/Lga/lga"),
      loading,
    }),
  },

  {
    path: "/school/details/:id",
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/SchoolClass/schoolClass"),
      loading,
    }),
  },
  {
    path: "/school/class/:id",
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/SchoolClass/AddClass/class"),
      loading,
    }),
  },

  {
    path: "/school/subject/:id",
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/SchoolClass/AddSubject/subject"),
      loading,
    }),
  },

  {
    path: "/school/teacher/:id",
    exact: true,
    Component: Loadable({
      loader: () => import("../Admin/SchoolClass/AddTeacher/teacher"),
      loading,
    }),
  },

  {
    redirect: true,
    path: "/",
    to: "/dashboard",
    navbarName: "Redirect",
  },
];

export default adminRoutes;
