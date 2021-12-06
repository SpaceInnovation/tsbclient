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
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
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
    const { qualification, onCloseModal, eachData } = this.props;
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          name: eachData.name,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(
        newProps,
        "qualification",
        "patchQualification"
      ) &&
      isEqual(
        qualification.patchQualification,
        newProps.qualification.patchQualification
      ) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { qualification } = this.props;
    if (
      qualification.patchQualification !==
      prevProps.qualification.patchQualification
    ) {
      const { patchQualification } = qualification;
      const { success } = patchQualification;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchQualification.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchQualification,
        loading: false,
      });
    }

    if (
      qualification.postQualification !==
      prevProps.qualification.postQualification
    ) {
      const { postQualification } = qualification;
      const { success } = postQualification;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postQualification.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postQualification,
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
      postQualification,
      pageType,
      patchQualification,
      eachData,
      fetchData,
      onCloseModal,
    } = this.props;
    switch (pageType) {
      case "add":
        postQualification(values);
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
        patchQualification(values, eachData._id);
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
    const { classes, postQualification } = this.props;
    const values = { name };
    return (
      <>
        <div>
          <Card>
            {postQualification ? (
              <CardHeader
                title="Add New Qualifation"
                style={{ color: "#2196f3" }}
              />
            ) : (
              <CardHeader
                title="Edit Qualifation"
                style={{ color: "#2196f3" }}
              />
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
                  <h3 style={{ color: "#2196f3" }}>Qualification Details</h3>

                  <TextField
                    label="Qualification"
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
                    {postQualification ? "Add New" : "Edit"}
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
