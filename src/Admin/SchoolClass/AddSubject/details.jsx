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
import { fetchSubjects } from "../../../actions/actions_admin_subject";

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
  subjectList: [],
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
    const { fetchSubjects } = this.props;
    await fetchSubjects();
  }

  componentWillReceiveProps(newProps) {
    const { schoolSubject, onCloseModal, eachData } = this.props;
    if (typeof newProps.subject.fetchSubjects === "object") {
      const data = newProps.subject.fetchSubjects;
      this.setState({
        subjectList: data,
      });
    }
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          subject: eachData.subject._id,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(
        newProps,
        "schoolSubject",
        "patchSchoolSubject"
      ) &&
      isEqual(
        schoolSubject.patchSchoolSubject,
        newProps.schoolSubject.patchSchoolSubject
      ) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { schoolSubject } = this.props;
    // console.log("schoolSubject", schoolSubject);
    if (
      schoolSubject.patchSchoolSubject !==
      prevProps.schoolSubject.patchSchoolSubject
    ) {
      const { patchSchoolSubject } = schoolSubject;
      const { success } = patchSchoolSubject;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchSchoolSubject,
          loading: false,
        });
        return false;
      }
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchSchoolSubject,
        loading: false,
      });
    }
    if (
      schoolSubject.postSchoolSubject !==
      prevProps.schoolSubject.postSchoolSubject
    ) {
      const { postSchoolSubject } = schoolSubject;
      const { success } = postSchoolSubject;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postSchoolSubject.message,
          loading: false,
        });
        return false;
      }
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postSchoolSubject,
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
      postSchoolSubject,
      pageType,
      patchSchoolSubject,
      eachData,
      fetchData,
      onCloseModal,
      id,
    } = this.props;

    switch (pageType) {
      case "add":
        postSchoolSubject(values, id);
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
        patchSchoolSubject(values, eachData.school._id, eachData._id);
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
      subjectList,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
    } = this.state;
    const values = { subject };
    const { postSchoolSubject } = this.props;

    return (
      <>
        <div>
          <Card>
            {postSchoolSubject ? (
              <CardHeader
                title="Add New Subject"
                style={{ color: "#2196f3" }}
              />
            ) : (
              <CardHeader title="Edit Subject" style={{ color: "#2196f3" }} />
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
                  <h3 style={{ color: "#2196f3" }}>Subject Details</h3>
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel
                      style={{
                        position: "absolute",
                        left: "15px",
                      }}
                      id="demo-simple-select-label"
                    >
                      Subject
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
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
                    {postSchoolSubject ? "Add New" : "Edit"}
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
  subject: state.subject,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchSubjects: () => {
    dispatch(fetchSubjects());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withStyles(styles)(AddPage));
