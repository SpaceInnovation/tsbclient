import React, { Component } from "react";
import AdminMenuLink from "./AdminMenuLink";
import { withStyles } from "@material-ui/core";
import sidebarStyle from "./SidebarStyle";

class AdminSidebar extends Component {
  //   // verifies if routeName is the one active (in browser input)
  activeRoute = (routeName) => {
    const { props } = this.props;
    const { match } = props;
    return match.url === routeName;
  };

  render() {
    const { routes, classes, color, match } = this.props;
    const links = (
      <AdminMenuLink
        routes={routes}
        activeRoute={this.activeRoute}
        color={color}
        classes={classes}
        match={match}
      />
    );
    return (
      <div>
        <div className={classes.sidebarWrapper}>{links}</div>
      </div>
    );
  }
}

export default withStyles(sidebarStyle)(AdminSidebar);
