import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../../components/Snackbar";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import Validator from "../../../helpers/validator";
import isEqual from "lodash/isEqual";
import { fetchClasses } from "../../../actions/actions_admin_class";

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  select: {
    width: 100,
  },
});

const initialstate = {
  classes: "",
  classList: [],
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
    const { fetchClasses } = this.props;
    await fetchClasses();
  }

  componentWillReceiveProps(newProps) {
    const { schoolClass, onCloseModal, eachData } = this.props;
    if (typeof newProps.classReducer.fetchClasses === "object") {
      const data = newProps.classReducer.fetchClasses;
      this.setState({
        classList: data,
      });
    }
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          classes: eachData.classes._id,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(newProps, "schoolClass", "patchSchoolClass") &&
      isEqual(
        schoolClass.patchSchoolClass,
        newProps.schoolClass.patchSchoolClass
      ) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { schoolClass } = this.props;
    if (
      schoolClass.patchSchoolClass !== prevProps.schoolClass.patchSchoolClass
    ) {
      const { patchSchoolClass } = schoolClass;
      const { success } = patchSchoolClass;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchSchoolClass.message,
          loading: false,
        });
        return false;
      }
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchSchoolClass,
        loading: false,
      });
    }
    if (schoolClass.postSchoolClass !== prevProps.schoolClass.postSchoolClass) {
      const { postSchoolClass } = schoolClass;
      const { success } = postSchoolClass;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postSchoolClass.message,
          loading: false,
        });
        return false;
      }
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postSchoolClass,
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
      postSchoolClass,
      pageType,
      patchSchoolClass,
      eachData,
      fetchData,
      onCloseModal,
      id,
    } = this.props;

    switch (pageType) {
      case "add":
        postSchoolClass(values, id);
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
        patchSchoolClass(values, eachData.school._id, eachData._id);
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
      classes,
      classList,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
    } = this.state;
    const values = { classes };
    const { postSchoolClass } = this.props;

    return (
      <>
        <div>
          <Card>
            {postSchoolClass ? (
              <CardHeader title="Add New Class" style={{ color: "#2196f3" }} />
            ) : (
              <CardHeader title="Edit Class" style={{ color: "#2196f3" }} />
            )}
            <CardContent>
              <div style={{ textAlign: "center", justifyContent: "center" }}>
                <Typography variant="h5" component="h5">
                  {/* {eachData.schoo} */}
                </Typography>
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
                  <h3 style={{ color: "#2196f3" }}>Class Details</h3>
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel
                      style={{
                        position: "absolute",
                        left: "15px",
                      }}
                      id="demo-simple-select-label"
                    >
                      Class
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="selectedLgas"
                      value={classes}
                      name="classes"
                      onChange={this.handleChange}
                      variant="outlined"
                      label="Class"
                      required
                    >
                      {classList.length > 0
                        ? classList.map((item, key) => (
                            <MenuItem key={key} value={item._id}>
                              {item.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "#4bc9f9",
                      marginTop: "10px",
                    }}
                  >
                    {postSchoolClass ? "Add New" : "Edit"}
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
const mapStateToProps = (state) => ({
  classReducer: state.classReducer,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchClasses: () => {
    dispatch(fetchClasses());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withStyles(styles)(AddPage));
