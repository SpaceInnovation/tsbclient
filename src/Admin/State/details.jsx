import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import Validator from "../../helpers/validator";
import isEqual from "lodash/isEqual";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
});

const initialstate = {
  name: "",
  loading: false,
  open: false,
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
    const { state, onCloseModal, eachData } = this.props;
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          name: eachData.name,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(newProps, "state", "patchState") &&
      isEqual(state.patchState, newProps.state.patchState) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { state } = this.props;
    if (state.patchState !== prevProps.state.patchState) {
      const { patchState } = state;
      const { success } = patchState;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchState.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchState,
        loading: false,
      });
    }

    if (state.postState !== prevProps.state.postState) {
      const { postState } = state;
      const { success } = postState;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postState.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postState,
        loading: false,
      });
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  createProperty = (values, e) => {
    e.preventDefault();
    const {
      postState,
      pageType,
      patchState,
      eachData,
      onCloseModal,
      fetchData,
    } = this.props;
    switch (pageType) {
      case "add":
        postState(values);
        this.setState({
          loading: true,
        });
        this.clearState();

        setTimeout(() => {
          fetchData();
        }, 2000);

        setTimeout(() => {
          onCloseModal();
        }, 3000);
        break;

      case "edit":
        patchState(values, eachData._id);
        this.setState({
          loading: true,
        });
        this.clearState();

        setTimeout(() => {
          fetchData();
        }, 2000);

        setTimeout(() => {
          onCloseModal();
        }, 3000);
        break;

      default:
        break;
    }
  };

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };
  render() {
    let { name, loading, snackBarOpen, snackBarMessage, snackBarVariant } =
      this.state;
    const { classes, postState } = this.props;
    const values = { name };
    return (
      <>
        <div>
          <Card>
            {postState ? (
              <CardHeader title="Add New State" style={{ color: "#2196f3" }} />
            ) : (
              <CardHeader title="Edit State" style={{ color: "#2196f3" }} />
            )}
            <CardContent>
              <div style={{ textAlign: "center", justifyContent: "center" }}>
                <form onSubmit={this.createProperty.bind(null, values)}>
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
                  <h3 style={{ color: "#2196f3" }}>State Details</h3>

                  <TextField
                    label="State"
                    value={name}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    name="name"
                    fullWidth
                    required
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    fullWidth
                    style={{ fontWeight: "bold", backgroundColor: "#4bc9f9" }}
                  >
                    {postState ? "Add New" : "Edit"}
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

export default withStyles(styles)(AddPage);
