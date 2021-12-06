import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchQualification,
  deleteQualification,
  patchQualification,
  postQualification,
} from "../../actions/actions_admin_qualification";
import EnhancedTable from "../../components/Table/EnhancedTable";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import Validator from "../../helpers/validator";
import TableCell from "@material-ui/core/TableCell";
import AddNew from "./modal";
import { BACKEND_URL, API_KEY } from "../../actions/api";
import { getFromLocalStorage } from "../../helpers/browserStorage";

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

class Qualification extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchQualification } = this.props;
    await fetchQualification();
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchQualifications } = newProps.qualification;
    const { success } = fetchQualification;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage:
          fetchQualifications.message || fetchQualifications.data,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.qualification, "fetchQualifications") &&
      typeof newProps.qualification.fetchQualifications === "object"
    ) {
      this.setState({
        data: newProps.qualification.fetchQualifications,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { qualification } = this.props;
    if (
      qualification.deleteQualification !==
      prevProps.qualification.deleteQualification
    ) {
      const { deleteQualification } = qualification;
      const { success } = deleteQualification;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage:
            deleteQualification.message || deleteQualification.data,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteQualification,
        data: filteredArray,
      });
    }
  }
  fetchData = () => {
    return fetch(`${BACKEND_URL}/qualification/all/?key=${API_KEY}`, {
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

  handleDeleteClick = (qualificationIDs) => {
    const { data } = this.state;
    const { deleteQualification } = this.props;

    qualificationIDs.forEach((adminID, index) => {
      deleteQualification(adminID);
      filteredArray = data.filter(
        (datum) => qualificationIDs.indexOf(datum._id) === -1
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
    const { patchQualification, qualification } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          qualification={qualification}
          patchQualification={patchQualification}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { qualification, postQualification } = this.props;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            qualification={qualification}
            postQualification={postQualification}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Qualifications</h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of Qualification"
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
  qualification: state.qualification,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchQualification: () => {
    dispatch(fetchQualification());
  },
  deleteQualification: (adminId) => {
    dispatch(deleteQualification(adminId));
  },
  patchQualification: (data, adminId) =>
    dispatch(patchQualification(data, adminId)),
  postQualification: (data) => dispatch(postQualification(data)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Qualification);
