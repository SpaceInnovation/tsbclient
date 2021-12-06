import React from "react";
// import Link from "react-router-dom/Link";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import { signoutUser } from "../../actions/actions_auth";
import withStyles from "@material-ui/core/styles/withStyles";
import headerLinksStyle from "../../assets/components/headerLinkStyle";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const AdminHeader = (props) => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleClick = () => {
    signoutUser("admin");
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const { classes } = props;

  return (
    <div className={styles.root}>
      <div>
        <Button
          className={classes.navLink}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar
            alt="User Avatar"
            src={"image"}
            style={{ backgroundColor: "#058bfd" }}
          />
          {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      <a href={`/profile`} className={classes.dropdownLink}>
                        <AccountCircle style={{ marginBottom: "-8px" }} />
                        My Profile
                      </a>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <span
                        onClick={handleClick}
                        className={classes.dropdownLink}
                      >
                        <PowerSettingsNew style={{ marginBottom: "-8px" }} />
                        Logout
                      </span>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default withStyles(headerLinksStyle)(AdminHeader);
