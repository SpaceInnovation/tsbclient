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
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { withStyles, FormControl } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { fetchGradeLevel } from "../../actions/actions_admin_gradeLevel";
import { fetchQualification } from "../../actions/actions_admin_qualification";
import { fetchSubjects } from "../../actions/actions_admin_subject";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Link = require("react-router-dom").Link;

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  InputLabel: {
    position: "absolute",
    left: "15px",
  },

  date: {
    width: "100%",
    height: "2.500em",
    padding: "6px 0 7px",
    background: "none",
    boxSizing: "content-box",
    letterSpacing: "inherit",
    animationDuration: "10ms",
    textAlign: "center",
    borderRadius: "5px",
    borderColor: "lightgrey",
    font: "caption",
    color: "gray",
    border: "outset",
  },
});

const initialstate = {
  surname: "",
  firstName: "",
  otherNames: "",
  NIN: "",
  email: "",
  disability: "",
  maritalStatus: "",
  dob: new Date(),
  spouse: "",
  nationality: "",
  stateOrigin: "",
  address: "",
  imageURL: null,
  discipline: "",
  subject: "",
  subjectList: [],
  phone: "",
  gender: "",
  LGAOrigin: "",
  qualification: "",
  qualificationList: [],
  gradeLevel: "",
  gradeLevelList: [],
  nName: "",
  nEmail: "",
  nOccupation: "",
  nRelationship: "",
  nPhone: "",
  nAddress: "",
  title: "",
  staffID: "",
  appointmentDate: new Date(),
  loading: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
  errorMessage: "",
  open: false,
  nextOfKin: {},
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
    const { fetchGradeLevel, fetchQualification, fetchSubjects } = this.props;
    await fetchGradeLevel();
    await fetchQualification();
    await fetchSubjects();
  }

  componentWillReceiveProps(newProps) {
    const { teacher, onCloseModal, eachData } = this.props;
    if (typeof newProps.gradeLevel.fetchGradeLevels === "object") {
      const data = newProps.gradeLevel.fetchGradeLevels;

      this.setState({
        gradeLevelList: data,
      });
    }
    if (typeof newProps.qualification.fetchQualifications === "object") {
      const data = newProps.qualification.fetchQualifications;
      this.setState({
        qualificationList: data,
      });
    }

    if (typeof newProps.subject.fetchSubjects === "object") {
      const data = newProps.subject.fetchSubjects;
      this.setState({
        subjectList: data,
      });
    }

    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          surname: eachData.surname,
          firstName: eachData.firstName,
          otherNames: eachData.otherNames,
          NIN: eachData.NIN,
          email: eachData.email,
          disability: eachData.disability,
          maritalStatus: eachData.maritalStatus,
          spouse: eachData.spouse,
          nationality: eachData.nationality,
          stateOrigin: eachData.stateOrigin,
          address: eachData.address,
          discipline: eachData.discipline,
          subject: eachData.subject,
          gender: eachData.gender,
          phone: eachData.phone,
          LGAOrigin: eachData.LGAOrigin,
          qualification: eachData.qualification._id,
          gradeLevel: eachData.gradeLevel._id,
          title: eachData.title,
          staffID: eachData.staffID,
          nEmail: eachData.nextOfKin.email,
          nAddress: eachData.nextOfKin.address,
          nPhone: eachData.nextOfKin.phone,
          nName: eachData.nextOfKin.name,
          nOccupation: eachData.nextOfKin.occupation,
          nRelationship: eachData.nextOfKin.relationship,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(newProps, "teacher", "patchTeacher") &&
      isEqual(teacher.patchTeacher, newProps.teacher.patchTeacher) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { teacher } = this.props;
    if (teacher.patchTeacher !== prevProps.teacher.patchTeacher) {
      const { patchTeacher } = teacher;
      const { success } = patchTeacher;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchTeacher.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchTeacher,
        loading: false,
      });
    }

    if (teacher.postTeacher !== prevProps.teacher.postTeacher) {
      const { postTeacher } = teacher;
      const { success } = postTeacher;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postTeacher.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postTeacher,
        loading: false,
      });
    }
  }

  handleSelectChange = (type, selected) => {
    this.setState({
      [type]: selected.value,
    });
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    this.setState({
      imageURL: file,
    });
  };

  handleDateChange = (name, date) => {
    this.setState({
      [name]: date,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  createProperty = (values, e) => {
    var dateOfBirth = values.dob.toString().substring(0, 16);
    var dateOfApp = values.appointmentDate.toString().substring(0, 16);
    e.preventDefault();
    const { nEmail, nAddress, nPhone, nName, nOccupation, nRelationship } =
      values;
    const newValues = {
      ...values,
      nextOfKin: {
        email: nEmail,
        address: nAddress,
        phone: nPhone,
        name: nName,
        occupation: nOccupation,
        relationship: nRelationship,
      },
      dob: dateOfBirth,
      appointmentDate: dateOfApp,
    };

    const {
      postTeacher,
      pageType,
      patchTeacher,
      eachData,
      fetchData,
      onCloseModal,
    } = this.props;
    switch (pageType) {
      case "add":
        postTeacher(newValues);
        this.setState({
          loading: true,
        });
        // this.clearState();

        setTimeout(() => {
          fetchData();
        }, 2000);

        setTimeout(() => {
          onCloseModal();
        }, 3000);
        break;

      case "edit":
        patchTeacher(newValues, eachData._id);
        this.setState({
          loading: true,
        });
        // this.clearState();

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
      surname,
      firstName,
      otherNames,
      NIN,
      email,
      disability,
      maritalStatus,
      spouse,
      nationality,
      stateOrigin,
      address,
      imageURL,
      discipline,
      subject,
      gender,
      phone,
      LGAOrigin,
      qualification,
      gradeLevel,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
      title,
      dob,
      appointmentDate,
      nEmail,
      nAddress,
      nPhone,
      staffID,
      nName,
      nOccupation,
      nRelationship,
      qualificationList,
      gradeLevelList,
      subjectList,
    } = this.state;
    const { classes, postTeacher } = this.props;
    const values = {
      surname,
      firstName,
      otherNames,
      LGAOrigin,
      subject,
      qualification,
      gender,
      phone,
      gradeLevel,
      maritalStatus,
      address,
      nationality,
      spouse,
      imageURL,
      title,
      dob,
      nEmail,
      nAddress,
      nName,
      nOccupation,
      nRelationship,
      nPhone,
      staffID,
      appointmentDate,
      NIN,
      disability,
      stateOrigin,
      discipline,
      email,
    };

    return (
      <>
        <div>
          <Card>
            {postTeacher ? (
              <CardHeader
                title="Add New Teacher"
                style={{ color: "#2196f3" }}
              />
            ) : (
              <CardHeader title="Edit Teacher" style={{ color: "#2196f3" }} />
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
                  <h3 style={{ color: "#2196f3" }}>Teacher Details</h3>
                  <Grid container>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Surname"
                        value={surname}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="surname"
                        // required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Fisrt Name"
                        value={firstName}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="firstName"
                        // required
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Other Names"
                        value={otherNames}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="otherNames"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="NIN"
                        value={NIN}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="NIN"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          className={classes.InputLabel}
                          id="title-simple-select-label"
                        >
                          Select Title
                        </InputLabel>
                        <Select
                          labelId="title-simple-select-label"
                          id="title-simple-select"
                          value={title}
                          label="Title"
                          name="title"
                          onChange={this.handleChange}
                          variant="outlined"
                        >
                          <MenuItem value={"mr"}>Mr</MenuItem>
                          <MenuItem value={"mrs"}>Mrs</MenuItem>
                          <MenuItem value={"miss"}>Miss</MenuItem>
                          <MenuItem value={"others"}>Others</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          className={classes.InputLabel}
                          id="gender-simple-select-label"
                        >
                          Select Gender
                        </InputLabel>
                        <Select
                          labelId="gender-simple-select-label"
                          id="gender-simple-select"
                          value={gender}
                          name="gender"
                          onChange={this.handleChange}
                          variant="outlined"
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Phone"
                        value={phone}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="phone"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Email"
                        value={email}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="email"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="LGA Origin"
                        value={LGAOrigin}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="LGAOrigin"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Address"
                        value={address}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="address"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          className={classes.InputLabel}
                          id="nationality-simple-select-label"
                        >
                          Select Nationality
                        </InputLabel>
                        <Select
                          labelId="nationality-simple-select-label"
                          id="nationality-simple-select"
                          label="nationality"
                          value={nationality}
                          name="nationality"
                          onChange={this.handleChange}
                          variant="outlined"
                        >
                          <MenuItem value={"nigeria"}>Nigeria</MenuItem>
                          <MenuItem value={"others"}>Others</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          className={classes.InputLabel}
                          id="maritalStatus-simple-select-label"
                        >
                          Select MaritalStatus
                        </InputLabel>
                        <Select
                          labelId="maritalStatus-simple-select-label"
                          id="maritalStatus-simple-select"
                          label="maritalStatus"
                          value={maritalStatus}
                          name="maritalStatus"
                          onChange={this.handleChange}
                          variant="outlined"
                        >
                          <MenuItem value={"married"}>Married</MenuItem>
                          <MenuItem value={"single"}>Single</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Disability"
                        value={disability}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="disability"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="State Of Origin"
                        value={stateOrigin}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="stateOrigin"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Discipline"
                        value={discipline}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="discipline"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          className={classes.InputLabel}
                          id="subject-simple-select-label"
                        >
                          Select Subject
                        </InputLabel>
                        <Select
                          labelId="subject-simple-select-label"
                          id="selectedSubject"
                          label="subject"
                          value={subject}
                          name="subject"
                          onChange={this.handleChange}
                          variant="outlined"
                          // required
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
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          className={classes.InputLabel}
                          id="qualification-simple-select-label"
                        >
                          Select Qualification
                        </InputLabel>
                        <Select
                          labelId="qualification-simple-select-label"
                          id="selectedQualification"
                          label="qualification"
                          value={qualification}
                          name="qualification"
                          onChange={this.handleChange}
                          variant="outlined"
                          // required
                        >
                          {qualificationList.length > 0
                            ? qualificationList.map(({ name, _id }) => (
                                <MenuItem key={_id} value={_id}>
                                  {name}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          className={classes.InputLabel}
                          id="gradeLevel-simple-select-label"
                        >
                          Select Gradelevel
                        </InputLabel>
                        <Select
                          labelId="gradeLevel-simple-select-label"
                          id="selectedGradeLevel"
                          label="gradelevel"
                          value={gradeLevel}
                          name="gradeLevel"
                          onChange={this.handleChange}
                          variant="outlined"
                          // required
                        >
                          {gradeLevelList.length > 0
                            ? gradeLevelList.map((item, key) => (
                                <MenuItem key={key} value={item._id}>
                                  {item.name}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Name of Spouse"
                        value={spouse}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="spouse"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <TextField
                        label="Staff ID"
                        value={staffID}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="staffID"
                        fullWidth
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <InputLabel htmlFor="dateOfAppointment">
                        <Typography>Date of Appointment</Typography>
                      </InputLabel>
                      <DatePicker
                        id="dateOfAppointment"
                        selected={appointmentDate}
                        onChange={(date) =>
                          this.handleDateChange("appointmentDate", date)
                        }
                        className={classes.date}
                      />
                    </Grid>

                    <Grid item xs={12} md={6} sm={6} lg={6}>
                      <InputLabel htmlFor="dateOfBirth">
                        <Typography>Date of Birth</Typography>
                      </InputLabel>
                      <DatePicker
                        selected={dob}
                        id="dateOfBirth"
                        onChange={(date) => this.handleDateChange("dob", date)}
                        className={classes.date}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Link to="/webcam">
                        <Button>Take A Photo</Button>
                      </Link>
                      <Card>
                        <CardContent>
                          <input
                            accept="image/*"
                            type="file"
                            name="imageURL"
                            onChange={this.handleImageChange}
                            // required
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  <h3 style={{ color: "#2196f3" }}>Next Of Kin</h3>
                  <Grid container>
                    <Grid item xs={12} md={4} sm={4} lg={4}>
                      <TextField
                        label="Name"
                        value={nName}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="nName"
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={4} sm={4} lg={4}>
                      <TextField
                        label="Email"
                        value={nEmail}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="nEmail"
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={4} sm={4} lg={4}>
                      <TextField
                        label="Occupation"
                        value={nOccupation}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="nOccupation"
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={4} sm={4} lg={4}>
                      <TextField
                        label="Relationship"
                        value={nRelationship}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="nRelationship"
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={4} sm={4} lg={4}>
                      <TextField
                        label="Address"
                        value={nAddress}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="nAddress"
                        // required
                      />
                    </Grid>
                    <Grid item xs={12} md={4} sm={4} lg={4}>
                      <TextField
                        label="Phone"
                        value={nPhone}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="nPhone"
                        // required
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "#4bc9f9",
                      marginTop: "10px",
                    }}
                    fullWidth
                  >
                    {postTeacher ? "Add New" : "Edit"}
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
  gradeLevel: state.gradeLevel,
  qualification: state.qualification,
  teacher: state.teacher,
  subject: state.subject,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchQualification: () => {
    dispatch(fetchQualification());
  },
  fetchGradeLevel: () => {
    dispatch(fetchGradeLevel());
  },
  fetchSubjects: () => {
    dispatch(fetchSubjects());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withStyles(styles)(AddPage));
