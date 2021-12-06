import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import Validator from "../../helpers/validator";
import InputLabel from "@material-ui/core/InputLabel";

import isEqual from "lodash/isEqual";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import { fetchTeachers } from "../../actions/actions_admin_teacher";
import { fetchSubjects } from "../../actions/actions_admin_subject";
import { fetchSchools } from "../../actions/actions_admin_school";
import FormControl from "@material-ui/core/FormControl";

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
});

const initialstate = {
  subject: "",
  subjectList: [],
  school: "",
  schoolList: [],
  teacher: "",
  teacherList: [],
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
    const { fetchSubjects, fetchTeachers, fetchSchools } = this.props;
    await fetchSubjects();
    await fetchTeachers();
    await fetchSchools();
  }

  componentWillReceiveProps(newProps) {
    const { allocation, onCloseModal, eachData } = this.props;
    // console.log("eachData", eachData);
    if (typeof newProps.subject.fetchSubjects === "object") {
      const data = newProps.subject.fetchSubjects;
      this.setState({
        subjectList: data,
      });
    }

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

    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          name: eachData.name,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(newProps, "allocation", "patchAllocation") &&
      isEqual(
        allocation.patchAllocation,
        newProps.allocation.patchAllocation
      ) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { allocation } = this.props;
    if (allocation.patchAllocation !== prevProps.allocation.patchAllocation) {
      const { patchAllocation } = allocation;
      const { success } = patchAllocation;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchAllocation.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchAllocation,
        loading: false,
      });
    }

    if (allocation.postAllocation !== prevProps.allocation.postAllocation) {
      const { postAllocation } = allocation;
      const { success } = postAllocation;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postAllocation.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postAllocation,
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
      postAllocation,
      pageType,
      patchAllocation,
      eachData,
      fetchData,
      onCloseModal,
    } = this.props;
    switch (pageType) {
      case "add":
        postAllocation(values, eachData._id);
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
        patchAllocation(values, eachData._id);
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
      subject,
      teacher,
      school,
      schoolList,
      teacherList,
      subjectList,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
    } = this.state;
    const { classes, postAllocation } = this.props;
    const values = { subject, teacher, school };
    return (
      <>
        <div>
          <Card>
            {postAllocation ? (
              <CardHeader
                title="Add New Allocation"
                style={{ color: "#2196f3" }}
              />
            ) : (
              <CardHeader
                title="Edit Allocation"
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
                  <h3 style={{ color: "#2196f3" }}>Allocation Details</h3>

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
                      value={teacher}
                      name="teacher"
                      onChange={this.handleChange}
                      variant="outlined"
                      label="Teacher"
                      required
                    >
                      {teacherList.length > 0
                        ? teacherList.map((item, key) => (
                            <MenuItem key={key} value={item._id}>
                              {item.firstName}
                              {item.surname}
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
                      id="subject-simple-select-label"
                    >
                      Subject
                    </InputLabel>
                    <Select
                      labelId="subject-simple-select-label"
                      id="selectedSubject"
                      value={subject}
                      name="subject"
                      onChange={this.handleChange}
                      variant="outlined"
                      label="Subject"
                      required
                    >
                      {subjectList.length > 0
                        ? subjectList.map((item, key) => (
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
                      School
                    </InputLabel>
                    <Select
                      labelId="school-simple-select-label"
                      id="selectedSchool"
                      value={school}
                      name="school"
                      onChange={this.handleChange}
                      variant="outlined"
                      label="School"
                      required
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

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    fullWidth
                    style={{ fontWeight: "bold", backgroundColor: "#4bc9f9" }}
                  >
                    {postAllocation ? "Add New" : "Edit"}
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
  teacher: state.teacher,
  subject: state.subject,
  school: state.school,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchSubjects: () => {
    dispatch(fetchSubjects());
  },
  fetchTeachers: () => {
    dispatch(fetchTeachers());
  },
  fetchSchools: () => {
    dispatch(fetchSchools());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withStyles(styles)(AddPage));
