import React from "react";
import { Redirect } from "react-router-dom";
import { isVerified } from "../components/Auth/AccessControl";
import Loadable from "react-loadable";

const loading = () => <div></div>;

// Admin Containers
const Admin = Loadable({
  loader: () => import("../components/Layout/Dashboard/AdminDashboard"),
  loading,
});

const Login = Loadable({
  loader: () => import("../views/LandingPage/LandingPage"),
  loading,
});

const WebCam = Loadable({
  loader: () => import("../views/WebCam"),
  loading,
});

const validateAdmin = (props) => {
  const { location } = props;
  if (isVerified("admin")) {
    return <Admin {...props} />;
  }
  return (
    <Redirect
      to={{
        pathname: `/`,
        state: { from: location },
      }}
    />
  );
};

const indexRoutes = [
  {
    path: `/`,
    name: "AdminLoginPage",
    exact: true,
    Component: (props) => {
      const { location } = props;
      return isVerified("admin") ? (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { from: location },
          }}
        />
      ) : (
        <Login {...props} />
      );
    },
  },

  {
    path: `/webcam`,
    name: "WebCam",
    exact: true,
    Component: (props) => <WebCam {...props} />,
  },

  //   /**
  //    * @description Admin Route Directories.
  //    */

  {
    path: `/dashboard`,
    name: "Dashboard",
    exact: true,
    Component: (props) => validateAdmin(props),
  },

  {
    path: `/users`,
    name: "Admin Users",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/qualification`,
    name: "Qualications",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/gradelevel`,
    name: "Grade Levels",
    exact: true,
    Component: (props) => validateAdmin(props),
  },

  {
    path: `/subject`,
    name: "Subjects",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/lgaOrigin`,
    name: "LGAOrigin",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/school`,
    name: "Schools",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/class`,
    name: "Classes",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/teacher`,
    name: "Teachers",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/allocation`,
    name: "Allocations",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/lga`,
    name: "LGAs",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/school/details/:id`,
    name: "SchoolDetails",
    exact: true,
    Component: (props) => validateAdmin(props),
  },

  {
    path: `/school/class/:id`,
    name: "SchoolClass",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
  {
    path: `/school/subject/:id`,
    name: "SchoolTeachers",
    exact: true,
    Component: (props) => validateAdmin(props),
  },
];

export default indexRoutes;
