import React, { Component } from "react";
import classNames from "classnames";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from "@material-ui/core";
import sidebarStyle from "./SidebarStyle";
import Tooltip from "@material-ui/core/Tooltip";

const Link = require("react-router-dom").Link;

class Sidebar extends Component {
  render() {
    const { routes, activeRoute, classes, color } = this.props;
    return (
      <div>
        {routes.map((prop, key) => {
          let activeClass;
          // Check if prop has redirect property if so return null
          if (prop.redirect) return null;

          if (prop.path !== "/upgrade-to-pro") {
            activeClass = classNames({
              [` ${classes[color]}`]: activeRoute(prop.path),
            });
          }

          const whiteFontClasses = classNames({
            [` ${classes.whiteFont}`]: activeRoute(prop.path),
          });

          return (
            <Link
              to={prop.path}
              activeclassname="active"
              key={key}
              classes={classes.item}
              style={{
                textDecoration: "none",
                color: "#2c5680",
              }}
            >
              {prop.sidebarName ? (
                <Tooltip title={prop.sidebarName}>
                  <ListItem button className={classes.itemLink + activeClass}>
                    <ListItemIcon
                      className={classes.itemIcon + whiteFontClasses}
                    >
                      <prop.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={prop.sidebarName}
                      className={classes.itemText + whiteFontClasses}
                      disableTypography
                    />
                  </ListItem>
                </Tooltip>
              ) : null}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default withStyles(sidebarStyle)(Sidebar);
