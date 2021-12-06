import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchSchools,
  deleteSchool,
  patchSchool,
  postSchool,
  // postSchoolClass,
} from "../../actions/actions_admin_school";
import EnhancedTable from "./table";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import Validator from "../../helpers/validator";
import TableCell from "@material-ui/core/TableCell";
import AddNew from "./modal";
import { getFromLocalStorage } from "../../helpers/browserStorage";
import { BACKEND_URL, API_KEY } from "../../actions/api";

const columnData = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    searchable: true,
  },
  {
    id: "lga",
    numeric: false,
    disablePadding: true,
    label: "LGA",
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
  {
    name: "lga",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
];

let filteredArray;

class School extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchSchools } = this.props;
    await fetchSchools();
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchSchools } = newProps.school;

    const { success } = fetchSchools;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchSchools.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.school, "fetchSchools") &&
      typeof newProps.school.fetchSchools === "object"
    ) {
      this.setState({
        data: newProps.school.fetchSchools,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { school } = this.props;
    if (school.deleteSchool !== prevProps.school.deleteSchool) {
      const { deleteSchool } = school;
      const { success } = deleteSchool;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteSchool.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteSchool,
        loading: false,
      });
    }
  }

  fetchData = () => {
    return fetch(`${BACKEND_URL}/school/all/?key=${API_KEY}`, {
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
          data: json,
        });
        if (json.error) {
          throw json.error;
        }
      })
      .catch((error) => console.log(error));
  };

  handleDeleteClick = (adminIDs) => {
    const { data } = this.state;
    const { deleteSchool } = this.props;

    adminIDs.forEach((adminID, index) => {
      deleteSchool(adminID);
      filteredArray = data.filter(
        (datum) => adminIDs.indexOf(datum._id) === -1
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

  editButtonDisplay = (n) => {
    const { patchSchool, school } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          school={school}
          patchSchool={patchSchool}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;

    const { school, postSchool } = this.props;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            school={school}
            postSchool={postSchool}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Schools</h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of School"
            deleteItem={this.handleDeleteClick}
            editButton={this.editButtonDisplay}
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
  school: state.school,
});

const mapDispatchStateToProps = (dispatch) => ({
  // School
  fetchSchools: (data, id) => {
    dispatch(fetchSchools(data, id));
  },
  deleteSchool: (adminId) => {
    dispatch(deleteSchool(adminId));
  },
  patchSchool: (data, adminId) => dispatch(patchSchool(data, adminId)),
  postSchool: (data) => {
    dispatch(postSchool(data));
  },
  // postSchoolClass: (data, id) => {
  //   dispatch(postSchoolClass(data, id));
  // },
});

export default connect(mapStateToProps, mapDispatchStateToProps)(School);
