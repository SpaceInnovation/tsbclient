import React, { Component } from "react";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import Validator from "../../helpers/validator";
import isEqual from "lodash/isEqual";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import { fetchTeachers } from "../../actions/actions_admin_teacher";
import { fetchSchools } from "../../actions/actions_admin_school";

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
});

const initialstate = {
  teachers: "",
  teacherList: [],
  schools: "",
  schoolList: [],
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
    const { fetchSchools, fetchTeachers } = this.props;
    await fetchSchools();
    await fetchTeachers();
  }

  componentWillReceiveProps(newProps) {
    console.log("newProps", newProps);
    if (typeof newProps.teacher.fetchTeachers === "object") {
      const data = newProps.teacher.fetchTeachers;
      this.setState({
        teacherList: data,
      });
    }
    if (typeof newProps.school.fetchSchools === "object") {
      const data = newProps.school.fetchSchools;
      this.setState({
        schoolList: data,
      });
    }
    const { lga, onCloseModal, eachData } = this.props;
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          name: eachData.lga.name,
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
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  createProperty = (values, e) => {
    e.preventDefault();
    const { patchLga, eachData, onCloseModal, fetchData } = this.props;
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
  };

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };
  render() {
    let {
      teachers,
      schools,
      schoolList,
      teacherList,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
    } = this.state;
    const { classes, eachData } = this.props;
    const values = { teachers, schools };
    return (
      <>
        <div>
          <Card>
            <CardHeader
              title="Remove School or Teacher from a LGA"
              style={{ color: "#2196f3" }}
            />
            <div
              style={{
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" component="h5">
                {eachData.lga.name}
              </Typography>
            </div>
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
                      id="school-simple-select-label"
                    >
                      School
                    </InputLabel>
                    <Select
                      labelId="subject-simple-select-label"
                      id="selectedSchool"
                      value={schools}
                      name="schools"
                      onChange={this.handleChange}
                      variant="outlined"
                      label="School"
                    >
                      {schoolList.length > 0
                        ? schoolList.map((item, key) => (
                            <MenuItem key={key} value={item._id}>
                              {item.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel
                      style={{
                        position: "absolute",
                        left: "15px",
                      }}
                      id="teacher-simple-select-label"
                    >
                      Teacher
                    </InputLabel>
                    <Select
                      labelId="teacher-simple-select-label"
                      id="selectedTeacher"
                      value={teachers}
                      name="teachers"
                      onChange={this.handleChange}
                      variant="outlined"
                      label="Teacher"
                    >
                      {teacherList.length > 0
                        ? teacherList.map((item, key) => (
                            <MenuItem key={key} value={item._id}>
                              {item.surname}
                              {item.firstName}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    fullWidth
                    style={{ fontWeight: "bold", backgroundColor: "#4bc9f9" }}
                  >
                    Remove Item
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
  school: state.school,
  teacher: state.teacher,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchSchools: () => {
    dispatch(fetchSchools());
  },
  fetchTeachers: () => {
    dispatch(fetchTeachers());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withStyles(styles)(AddPage));
