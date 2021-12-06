import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchSubjects,
  deleteSubject,
  patchSubject,
  postSubject,
} from "../../actions/actions_admin_subject";
import EnhancedTable from "../../components/Table/EnhancedTable";
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
    const { fetchSubjects } = this.props;
    await fetchSubjects();
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchSubjects } = newProps.subject;
    const { success } = fetchSubjects;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchSubjects.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.subject, "fetchSubjects") &&
      typeof newProps.subject.fetchSubjects === "object"
    ) {
      this.setState({
        data: newProps.subject.fetchSubjects,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { subject } = this.props;
    if (subject.deleteSubject !== prevProps.subject.deleteSubject) {
      const { deleteSubject } = subject;
      const { success } = deleteSubject;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteSubject.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteSubject,
      });
    }
  }

  fetchData = () => {
    return fetch(`${BACKEND_URL}/subject/all/?key=${API_KEY}`, {
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
    const { deleteSubject } = this.props;

    adminIDs.forEach((adminID, index) => {
      deleteSubject(adminID);
      filteredArray = data.filter((datum) => adminIDs.indexOf(datum.id) === -1);
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
    const { patchSubject, subject } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          subject={subject}
          patchSubject={patchSubject}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { subject, postSubject } = this.props;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            subject={subject}
            postSubject={postSubject}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Subjects</h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of Subject"
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
  subject: state.subject,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchSubjects: () => {
    dispatch(fetchSubjects());
  },
  deleteSubject: (adminId) => {
    dispatch(deleteSubject(adminId));
  },
  patchSubject: (data, adminId) => dispatch(patchSubject(data, adminId)),
  postSubject: (data) => dispatch(postSubject(data)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Subject);
