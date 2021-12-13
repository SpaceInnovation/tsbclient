import React, { useEffect } from "react";
import clsx from "clsx";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Link from "react-router-dom/Link";
import App from "../../../Admin/Landing/layout";
import adminRoutes from "../../../routes/admin";
import { Switch, Redirect, Route } from "react-router-dom";
import AdminHeader from "../../Header/AdminHeader";
import Button from "@material-ui/core/Button";
import { getFromLocalStorage } from "../../../helpers/browserStorage";

// import Logo from "../../../assets/img/logo192.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button simple="true" size="small">
          TSB Network
        </Button>
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    // backgroundColor: "#5d8af9",
    backgroundColor: "#4bc9f9",
    textAlign: "center",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    backgroundColor: "#4bc9f9",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 520,
  },
}));

const switchRoutes = (
  <Switch>
    {adminRoutes.map((prop, key) => {
      const { Component, path } = prop;
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      if (prop.hasOwnProperty("exact")) {
        return <Route exact path={path} key={key} component={Component} />;
      } else {
        return <Route exact path={path} component={Component} key={key} />;
      }
    })}
  </Switch>
);

const changeTitle = () => {
  switch (window.location.pathname) {
    case `/dashboard}`:
      return "Dashboard";

    case `/users`:
      return "Admin Users";

    case `/qualification`:
      return "Qualifications";

    case `/gradelevel`:
      return "Grade Levels";

    case "/subject":
      return "Subjects";

    case "/lga":
      return "Local Government Areas";

    case "/school":
      return "Schools";

    case "/class":
      return "Classes";

    case "/lgaOrigin":
      return "Local Government Origin";

    case "/state":
      return "State";

    default:
      return "Dashboard";
  }
};

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(false);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const brand = (
  //   <div>
  //     <Link to="/">
  //       <div>
  //         <img src={Logo} alt="logo" height="65" />
  //       </div>
  //     </Link>
  //   </div>
  // );

  let adminUser;
  try {
    adminUser = JSON.parse(getFromLocalStorage("tsb-login:admin")).profile;
  } catch (error) {
    console.log(error.message);
  }

  const { username } = adminUser;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {changeTitle()}
            </Typography>
            <Typography
              noWrap
              style={{
                marginRight: "6px",
              }}
            >
              Welcome
            </Typography>
            <Typography noWrap>{username}</Typography>
            <AdminHeader />
          </Toolbar>
        </ClickAwayListener>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Typography
            variant="h2"
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            TSB
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ color: "#fff" }} />
          </IconButton>
        </div>
        <Divider />

        <App props={props} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {switchRoutes}
          <Box pt={6}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
