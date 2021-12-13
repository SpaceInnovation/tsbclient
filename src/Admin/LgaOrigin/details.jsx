import React, { Component } from "react";
import { connect } from "react-redux";
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import { fetchStates } from "../../actions/actions_admin_state";

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
});

const initialstate = {
  name: "",
  stateID: "",
  stateList: [],
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

  async componentDidMount() {
    const { fetchStates } = this.props;
    await fetchStates();
  }

  componentWillReceiveProps(newProps) {
    const { lga, onCloseModal, eachData } = this.props;
    if (typeof newProps.state.fetchStates === "object") {
      const data = newProps.state.fetchStates;
      this.setState({
        stateList: data,
      });
    }
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          name: eachData.name,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(newProps, "lga", "patchLga") &&
      isEqual(lga.patchLga, newProps.lga.patchLga) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { lga } = this.props;
    if (lga.patchLgaOrigin !== prevProps.lga.patchLgaOrigin) {
      const { patchLgaOrigin } = lga;
      const { success } = patchLgaOrigin;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchLgaOrigin.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchLgaOrigin,
        loading: false,
      });
    }

    if (lga.postLgaOrigin !== prevProps.lga.postLgaOrigin) {
      const { postLgaOrigin } = lga;
      const { success } = postLgaOrigin;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postLgaOrigin.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postLgaOrigin,
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
    const { postLga, pageType, patchLga, eachData, onCloseModal, fetchData } =
      this.props;
    switch (pageType) {
      case "add":
        postLga(values);
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
        patchLga(values, eachData._id);
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
    let {
      name,
      stateList,
      stateID,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
    } = this.state;
    const { classes, postLga } = this.props;
    const values = { name, stateID };
    return (
      <>
        <div>
          <Card>
            {postLga ? (
              <CardHeader
                title="Add New LGAOrigin"
                style={{ color: "#2196f3" }}
              />
            ) : (
              <CardHeader title="Edit LGAOrigin" style={{ color: "#2196f3" }} />
            )}
            {postLga ? (
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
                    <h3 style={{ color: "#2196f3" }}>LGA Details</h3>
                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                      <InputLabel
                        style={{
                          position: "absolute",
                          left: "15px",
                        }}
                        id="demo-simple-select-label"
                      >
                        State
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="selectedState"
                        value={stateID}
                        name="stateID"
                        onChange={this.handleChange}
                        variant="outlined"
                        label="State"
                        required
                      >
                        {stateList.length > 0
                          ? stateList.map((item, key) => (
                              <MenuItem key={key} value={item._id}>
                                {item.name}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    </FormControl>

                    <TextField
                      label="LGA"
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
                      Add New
                    </Button>
                  </form>
                </div>
              </CardContent>
            ) : (
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
                    <h3 style={{ color: "#2196f3" }}>LGA Details</h3>
                    <TextField
                      label="LGA"
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
                      Edit
                    </Button>
                  </form>
                </div>
              </CardContent>
            )}
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

const mapStateToProps = (state) => ({
  state: state.state,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchStates: () => {
    dispatch(fetchStates());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withStyles(styles)(AddPage));
