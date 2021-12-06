import React from "react";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Grid,
  FormControl,
  InputLabel,
  withStyles,
  CircularProgress,
  Snackbar,
  Typography,
} from "../../../node_modules/@material-ui/core";

import Button from "@material-ui/core/Button";
import AdminView from "../../components/Common/AdminInfo";
import Select from "react-select";
import Validator from "../../helpers/validator";
import Mysnackbar from "../../components/Snackbar";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  fullWidth: {
    width: "100%",
    fontSize: "20px",
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    marginTop: -12,
    marginLeft: -12,
    color: "#ffffff",
  },
  loadingPosition: {
    top: "50%",
    left: "90%",
  },
});

class AdminUserForm extends React.Component {
  constructor(props) {
    super(props);
    const { eachData } = this.props;
    this.state = {
      adminUserDetails: eachData,
      selectedRole: Validator.propertyExist(eachData, "role")
        ? {
            value: eachData.role,
            label: eachData.role.replace(/^\w/, (c) => c.toUpperCase()),
          }
        : null,
      selectedRoleStyle: `react-select-label-${
        Validator.propertyExist(eachData, "role") ? "visible" : "hidden"
      }`,
      loading: false,
      snackBarOpen: false,
      snackBarMessage: "Default Message",
      snackBarVariant: "error",
    };
  }

  componentDidUpdate(prevProps) {
    const { adminUsers, closeParentModal } = this.props;
    if (adminUsers.patchAdmin !== prevProps.adminUsers.patchAdmin) {
      const { patchAdmin } = adminUsers;
      const { success } = patchAdmin;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchAdmin.message,
          loading: false,
        });
        return false;
      }
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchAdmin,
      });
      setTimeout(() => {
        closeParentModal();
      }, 2000);
    }
  }
  componentWillReceiveProps(newProps) {
    const { adminUsers, closeParentModal } = this.props;
    if (
      Validator.propertyExist(newProps, "adminUsers", "patchAdmin") &&
      !isEqual(adminUsers.patchAdmin, newProps.adminUsers.patchAdmin)
    ) {
      if (typeof newProps.adminUsers.patchAdmin === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.adminUsers.patchAdmin,
          loading: false,
        });
        return false;
      }
      this.setState({
        loading: false,
      });
      closeParentModal();
    }
    return false;
  }

  onChangeSelect = (type, selected) => {
    this.setState({
      [`selected${type}`]: selected,
      [`selected${type}Style`]: `react-select-label-${
        selected === null ? "hidden" : "visible"
      }`,
    });
    const value = selected !== null ? selected.value : "";
    this.setAdminUserDetails(type.toLowerCase(), value);
  };

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  setAdminUserDetails = (type, value) => {
    const { adminUserDetails } = this.state;
    const newAdminUserDetails = JSON.parse(JSON.stringify(adminUserDetails));
    newAdminUserDetails[type] = value;
    this.setState({
      adminUserDetails: newAdminUserDetails,
    });
  };

  handleUpdateRole = () => {
    const { patchAdmin } = this.props;
    const { adminUserDetails } = this.state;

    this.setState({
      loading: true,
    });
    patchAdmin(adminUserDetails, adminUserDetails._id);
    setTimeout(() => {
      this.props.fetchData();
    }, 2000);
  };

  render() {
    const { classes } = this.props;
    const {
      adminUserDetails,
      selectedRole,
      selectedRoleStyle,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
    } = this.state;
    return (
      <div>
        <Card>
          <CardContent>
            <Grid container>
              <Grid Item xs={12} sm={12} md={12}>
                <div style={{ color: "#4bc9f9" }}>
                  <h4>View Admin</h4>
                  <p>Change Admin Role</p>
                </div>
              </Grid>
              <Grid Item xs={12} sm={12} md={6}>
                <AdminView eachData={adminUserDetails} />
              </Grid>
              <Grid Item xs={12} sm={12} md={6}>
                <InputLabel
                  htmlFor="selectedDiscount"
                  className={selectedRoleStyle}
                >
                  <Typography>Type or Select Admin Role</Typography>
                </InputLabel>
                <FormControl className={classes.formControl}>
                  <Select
                    id="selectedDiscount"
                    name="selectedDiscount"
                    value={selectedRole}
                    placeholder="Type or Select Admin Role"
                    onChange={(selected) =>
                      this.onChangeSelect("Role", selected)
                    }
                    options={["Super", "Master", "Support"].map((role) => ({
                      value: role.toLowerCase(),
                      label: role,
                    }))}
                  />
                </FormControl>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.fullWidth}
                    onClick={this.handleUpdateRole}
                    style={{ backgroundColor: "#4bc9f9" }}
                    disabled={loading}
                  >
                    Update Admin Role
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classNames({
                        [classes.buttonProgress]: true,
                        [classes.loadingPosition]: true,
                      })}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </CardContent>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
            <Mysnackbar
              onClose={this.onCloseHandler}
              variant={snackBarVariant}
              message={snackBarMessage}
            />
          </Snackbar>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AdminUserForm);
