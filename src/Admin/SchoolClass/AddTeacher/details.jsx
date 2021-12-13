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
import { fetchTeachers } from "../../../actions/actions_admin_teacher";

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  select: {
    width: 100,
  },
});

const initialstate = {
  subject: "",
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
    const { fetchTeachers } = this.props;
    await fetchTeachers();
  }

  componentWillReceiveProps(newProps) {
    const { schoolTeacher, onCloseModal, eachData } = this.props;
    if (typeof newProps.teacher.fetchTeachers === "object") {
      const data = newProps.teacher.fetchTeachers;
      this.setState({
        teacherList: data,
      });
    }
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          teacher: eachData.teacher._id,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(
        newProps,
        "schoolTeacher",
        "patchSchoolTeacher"
      ) &&
      isEqual(
        schoolTeacher.patchSchoolTeacher,
        newProps.schoolTeacher.patchSchoolTeacher
      ) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { schoolTeacher } = this.props;
    if (
      schoolTeacher.patchSchoolTeacher !==
      prevProps.schoolTeacher.patchSchoolTeacher
    ) {
      const { patchSchoolTeacher } = schoolTeacher;
      const { success } = patchSchoolTeacher;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchSchoolTeacher,
          loading: false,
        });
        return false;
      }
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchSchoolTeacher,
        loading: false,
      });
    }
    if (
      schoolTeacher.postSchoolTeacher !==
      prevProps.schoolTeacher.postSchoolTeacher
    ) {
      const { postSchoolTeacher } = schoolTeacher;
      const { success } = postSchoolTeacher;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postSchoolTeacher.message,
          loading: false,
        });
        return false;
      }
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postSchoolTeacher,
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
      postSchoolTeacher,
      pageType,
      patchSchoolTeacher,
      eachData,
      fetchData,
      onCloseModal,
      id,
    } = this.props;

    switch (pageType) {
      case "add":
        postSchoolTeacher(values, id);
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
        patchSchoolTeacher(values, eachData.teacher._id, eachData._id);
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
      teacher,
      teacherList,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
    } = this.state;

    const values = { teacher };
    const { postSchoolTeacher } = this.props;

    return (
      <>
        <div>
          <Card>
            {postSchoolTeacher ? (
              <CardHeader
                title="Add New Teacher"
                style={{ color: "#2196f3" }}
              />
            ) : (
              <CardHeader title="Edit Teacher" style={{ color: "#2196f3" }} />
            )}

            <CardContent>
              <div style={{ textAlign: "center", justifyContent: "center" }}>
                <Typography variant="h5" component="h5"></Typography>
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
                  <h3 style={{ color: "#2196f3" }}>Subject Details</h3>
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel
                      style={{
                        position: "absolute",
                        left: "15px",
                      }}
                      id="demo-simple-select-label"
                    >
                      Teacher
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
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
                              {item.surname}
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
                    {postSchoolTeacher ? "Add New" : "Edit"}
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
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchTeachers: () => {
    dispatch(fetchTeachers());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withStyles(styles)(AddPage));
