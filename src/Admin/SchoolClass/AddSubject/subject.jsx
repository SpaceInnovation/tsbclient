import { Grid, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  deleteSchoolSubject,
  patchSchoolSubject,
  postSchoolSubject,
} from "../../../actions/actions_admin_school_subject";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../../components/Snackbar";
import TableCell from "@material-ui/core/TableCell";
import AddNew from "./modal";
import Table from "./table";
import { getFromLocalStorage } from "../../../helpers/browserStorage";
import { BACKEND_URL, API_KEY } from "../../../actions/api";
import Validator from "../../../helpers/validator";
import { fetchAllSchoolSubjects } from "../../../actions/actions_admin_school_subject";

const columnData = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
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

class Subject extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchAllSchoolSubjects } = this.props;
    const { match } = this.props;
    const { id } = match.params;
    await fetchAllSchoolSubjects(id);
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchAllSchoolSubjects } = newProps.schoolSubject;
    const success = fetchAllSchoolSubjects
      ? fetchAllSchoolSubjects.success
      : null;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchAllSchoolSubjects.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(
        newProps.schoolSubject,
        "fetchAllSchoolSubjects"
      ) &&
      typeof newProps.schoolSubject.fetchAllSchoolSubjects === "object"
    ) {
      setTimeout(() => {
        this.setState({
          data: fetchAllSchoolSubjects,
        });
      }, 1000);
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { schoolSubject } = this.props;
    if (
      schoolSubject.deleteSchoolSubject !==
      prevProps.schoolSubject.deleteSchoolSubject
    ) {
      const { deleteSchoolSubject } = schoolSubject;
      const { success } = deleteSchoolSubject;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteSchoolSubject.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteSchoolSubject,
        loading: false,
      });
    }
  }

  fetchData = () => {
    const { match } = this.props;
    const { id } = match.params;
    return fetch(`${BACKEND_URL}/SchoolSubjects/school/${id}/?key=${API_KEY}`, {
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

  handleDeleteClick = (schoolSubjectIDs) => {
    const { data } = this.state;
    const { deleteSchoolSubject } = this.props;
    schoolSubjectIDs.forEach((schoolSubjectID, index) => {
      deleteSchoolSubject(schoolSubjectID);
      filteredArray = data.filter(
        (datum) => schoolSubjectIDs.indexOf(datum._id) === -1
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

  imagePanelDisplay = (n) => {
    return (
      <TableCell>
        <AddNew type="imageUpload" eachData={n} />
      </TableCell>
    );
  };

  editButtonDisplay = (n) => {
    const { patchSchoolSubject, schoolSubject } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          schoolSubject={schoolSubject}
          patchSchoolSubject={patchSchoolSubject}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { schoolSubject, postSchoolSubject, match } = this.props;
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
              schoolSubject={schoolSubject}
              postSchoolSubject={postSchoolSubject}
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
            <h4 style={{ marginRight: "10px" }}>List Of All Subjects</h4>
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
            imagePanelDisplay={this.imagePanelDisplay}
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
  schoolSubject: state.schoolSubject,
});

const mapDispatchStateToProps = (dispatch) => ({
  // School Subject
  fetchAllSchoolSubjects: (id) => {
    dispatch(fetchAllSchoolSubjects(id));
  },
  deleteSchoolSubject: (id) => {
    dispatch(deleteSchoolSubject(id));
  },
  patchSchoolSubject: (data, schoolId, id) =>
    dispatch(patchSchoolSubject(data, schoolId, id)),
  postSchoolSubject: (data, id) => {
    dispatch(postSchoolSubject(data, id));
  },
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Subject);
