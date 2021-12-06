import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import { CircularProgress } from "@material-ui/core";
import Validator from "../../helpers/validator";
import isEqual from "lodash/isEqual";

const initialstate = {
  loading: false,
  username: "",
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
  errorMessage: "",
};

class AddPage extends Component {
  state = {
    ...initialstate,
  };

  clearState = () => {
    this.setState({
      ...initialstate,
    });
  };
  componentWillReceiveProps(newProps) {
    const { adminUsers, onCloseModal, eachData } = this.props;
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          username: eachData.username,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(newProps, "adminUsers", "patchAdmin") &&
      isEqual(adminUsers.patchAdmin, newProps.adminUsers.patchAdmin) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { adminUsers } = this.props;
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
        loading: false,
      });
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };
  handleSubmit = (values, e) => {
    e.preventDefault();
    const { patchAdmin, eachData, onCloseModal, fetchData } = this.props;

    patchAdmin(values, eachData._id);

    this.clearState();

    setTimeout(() => {
      fetchData();
    }, 2000);

    setTimeout(() => {
      onCloseModal();
    }, 3000);

    this.setState({
      open: true,
      loading: true,
    });
  };
  render() {
    let { username, loading, snackBarMessage, snackBarOpen, snackBarVariant } =
      this.state;
    const values = { username };
    return (
      <>
        <div>
          <Card>
            <CardHeader title="Edit Admin" style={{ color: "#4bc9f9" }} />

            <CardContent>
              <div style={{ textAlign: "center", justifyContent: "center" }}>
                <form onSubmit={this.handleSubmit.bind(null, values)}>
                  {loading ? (
                    <div>
                      <Button
                        size="large"
                        style={{
                          fontWeight: "bold",
                          fontSize: "60px",
                        }}
                      >
                        <CircularProgress color="secondary" />
                      </Button>
                      <Typography>Loading Please wait......</Typography>
                    </div>
                  ) : null}
                  <TextField
                    required
                    variant="standard"
                    margin="normal"
                    id="username"
                    label="UserName"
                    name="username"
                    value={values.username}
                    autoComplete="username"
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    style={{ fontWeight: "bold", backgroundColor: "#4bc9f9" }}
                  >
                    Edit
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
            <MySnackbar
              onClose={this.onCloseHandler}
              variant={snackBarVariant}
              message={snackBarMessage}
            />
          </Snackbar>
        </div>
      </>
    );
  }
}

export default AddPage;
