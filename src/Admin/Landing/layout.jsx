import React, { Component } from "react";
import adminRoutes from "../../routes/admin";
import withStyles from "@material-ui/core/styles/withStyles";
import AdminSidebar from "../../components/Sidebar/AdminSideBar";
import dashboardStyle from "../../assets/jss/material-kit-react/layouts/dashboardStyle";

class App extends Component {
  render() {
    const { classes, ...rest } = this.props;
    const sidemu = <AdminSidebar routes={adminRoutes} color="blue" {...rest} />;
    return <div className={classes.wrapper}>{sidemu}</div>;
  }
}

export default withStyles(dashboardStyle)(App);
