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
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import { fetchLgasOrigin } from "../../actions/actions_admin_lgaOrigin";

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  select: {
    width: 100,
  },
});

const initialstate = {
  name: "",
  school: "",
  lga: "",
  lgaList: [],
  loading: false,
  open: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
  errorMessage: "",
  teacherData: [],
  classData: [],
  subjectData: [],
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
    const { fetchLgasOrigin } = this.props;
    await fetchLgasOrigin();
  }

  componentWillReceiveProps(newProps) {
    const { school, onCloseModal, eachData } = this.props;
    if (typeof newProps.lga.fetchLgasOrigin === "object") {
      const data = newProps.lga.fetchLgasOrigin;
      this.setState({
        lgaList: data,
      });
    }
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          name: eachData.name,
          lga: eachData.lga,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(newProps, "school", "patchSchool") &&
      isEqual(school.patchSchool, newProps.school.patchSchool) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { school } = this.props;
    if (school.patchSchool !== prevProps.school.patchSchool) {
      const { patchSchool } = school;
      const { success } = patchSchool;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchSchool.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchSchool,
        loading: false,
      });
    }

    if (school.postSchool !== prevProps.school.postSchool) {
      const { postSchool } = school;
      const { success } = postSchool;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postSchool.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postSchool,
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
      postSchool,
      pageType,
      patchSchool,
      eachData,
      fetchData,
      onCloseModal,
    } = this.props;
    switch (pageType) {
      case "add":
        postSchool(values);
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
        patchSchool(values, eachData._id);
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
      lga,
      lgaList,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
    } = this.state;

    const { postSchool } = this.props;
    const values = { name, lga };
    return (
      <>
        <div>
          <Card>
            {postSchool ? (
              <CardHeader title="Add New School" style={{ color: "#2196f3" }} />
            ) : (
              <CardHeader title="Edit School" style={{ color: "#2196f3" }} />
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
                  <h3 style={{ color: "#2196f3" }}>School Details</h3>

                  <TextField
                    label="School"
                    value={name}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    name="name"
                    fullWidth
                    required
                  />

                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel
                      style={{
                        position: "absolute",
                        left: "15px",
                      }}
                      id="demo-simple-select-label"
                    >
                      LGA
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="selectedLgas"
                      value={lga}
                      name="lga"
                      onChange={this.handleChange}
                      variant="outlined"
                      label="LGA"
                      required
                    >
                      {lgaList.length > 0
                        ? lgaList.map((item, key) => (
                            <MenuItem key={key} value={item._id}>
                              {item.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                  {/* {classData.slice(0, 3).map(({ name, _id }) => (
                    <MenuItem key={_id}>{name}</MenuItem>
                  ))} */}
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
                    {postSchool ? "Add New" : "Edit"}
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
  lga: state.lga,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchLgasOrigin: () => {
    dispatch(fetchLgasOrigin());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withStyles(styles)(AddPage));
