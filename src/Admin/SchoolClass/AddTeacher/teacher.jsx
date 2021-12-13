import { Grid, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  deleteSchoolTeacher,
  patchSchoolTeacher,
  postSchoolTeacher,
  fetchAllSchoolTeachers,
} from "../../../actions/actions_admin_school_teacher";
import { postTransfer } from "../../../actions/actions_admin_posting";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../../components/Snackbar";
import TableCell from "@material-ui/core/TableCell";
import AddNew from "./modal";
import Table from "./table";
import { getFromLocalStorage } from "../../../helpers/browserStorage";
import { BACKEND_URL, API_KEY } from "../../../actions/api";
import Validator from "../../../helpers/validator";

const columnData = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "FirstName",
    searchable: true,
  },
  {
    id: "surname",
    numeric: false,
    disablePadding: true,
    label: "Surname",
    searchable: true,
  },
];

const properties = [
  {
    name: "name",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
];

let filteredArray;

class Teacher extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchAllSchoolTeachers, match } = this.props;
    const { id } = match.params;
    await fetchAllSchoolTeachers(id);
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchAllSchoolTeachers } = newProps.schoolTeacher;
    const success = fetchAllSchoolTeachers
      ? fetchAllSchoolTeachers.success
      : null;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchAllSchoolTeachers.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(
        newProps.schoolTeacher,
        "fetchAllSchoolTeachers"
      ) &&
      typeof newProps.schoolTeacher.fetchAllSchoolTeachers === "object"
    ) {
      setTimeout(() => {
        this.setState({
          data: newProps.schoolTeacher.fetchAllSchoolTeachers,
        });
      }, 1000);
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { schoolTeacher } = this.props;
    if (
      schoolTeacher.deleteSchoolTeacher !==
      prevProps.schoolTeacher.deleteSchoolTeacher
    ) {
      const { deleteSchoolTeacher } = schoolTeacher;
      const { success } = deleteSchoolTeacher;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteSchoolTeacher.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteSchoolTeacher,
        loading: false,
      });
    }
  }

  fetchData = () => {
    const { match } = this.props;
    const { id } = match.params;
    return fetch(`${BACKEND_URL}/schoolteachers/school/${id}/?key=${API_KEY}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json ? json : null,
        });
        if (json.error) {
          throw json.error;
        }
      })
      .catch((error) => console.log(error));
  };

  handleDeleteClick = (schoolTeacherIDs) => {
    const { data } = this.state;
    const { deleteSchoolTeacher } = this.props;
    schoolTeacherIDs.forEach((schoolTeacherID, index) => {
      deleteSchoolTeacher(schoolTeacherID);
      filteredArray = data.filter(
        (datum) => schoolTeacherIDs.indexOf(datum._id) === -1
      );
    });
    this.setState({
      data: filteredArray,
    });
  };

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  transfer = (n) => {
    const { postTransfer, match, posting } = this.props;
    const { id } = match.params;

    return (
      <TableCell>
        <AddNew
          type="transfer"
          eachData={n}
          posting={posting}
          postTransfer={postTransfer}
          id={id}
        />
      </TableCell>
    );
  };

  editButtonDisplay = (n) => {
    const { patchSchoolTeacher, schoolTeacher } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          schoolTeacher={schoolTeacher}
          patchSchoolTeacher={patchSchoolTeacher}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { schoolTeacher, postSchoolTeacher, match } = this.props;
    const { id } = match.params;
    let schoolName;
    data.forEach((element) => {
      schoolName = element.school.name;
    });

    return (
      <Fragment>
        <Grid container>
          <Grid item xs={12} sm={6} md={6}>
            <AddNew
              type="add"
              data={data}
              schoolTeacher={schoolTeacher}
              postSchoolTeacher={postSchoolTeacher}
              fetchData={this.fetchData}
              id={id}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div
              style={{
                textAlign: "center",
                justifyContent: "center",
                color: "#2196f3",
              }}
            >
              <Typography variant="h5" component="h5">
                {schoolName}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Teacher</h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <Table
            columnData={columnData}
            data={data}
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of School"
            deleteItem={this.handleDeleteClick}
            editButton={this.editButtonDisplay}
            transfer={this.transfer}
          />
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
        </Grid>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  schoolTeacher: state.schoolTeacher,
  posting: state.posting,
});

const mapDispatchStateToProps = (dispatch) => ({
  // School Teacher
  fetchAllSchoolTeachers: (id) => {
    dispatch(fetchAllSchoolTeachers(id));
  },
  deleteSchoolTeacher: (id) => {
    dispatch(deleteSchoolTeacher(id));
  },
  patchSchoolTeacher: (data, schoolId, id) =>
    dispatch(patchSchoolTeacher(data, schoolId, id)),
  postSchoolTeacher: (data, id) => {
    dispatch(postSchoolTeacher(data, id));
  },
  postTransfer: (data, schFromID, teacherID) =>
    dispatch(postTransfer(data, schFromID, teacherID)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Teacher);
