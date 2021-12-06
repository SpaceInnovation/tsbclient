import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchGradeLevel,
  deleteGradeLevel,
  patchGradeLevel,
  postGradeLevel,
} from "../../actions/actions_admin_gradeLevel";
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

class GradeLevel extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchGradeLevel } = this.props;
    await fetchGradeLevel();
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchGradeLevels } = newProps.gradeLevel;
    const { success } = fetchGradeLevel;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchGradeLevels.message || fetchGradeLevels.data,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.gradeLevel, "fetchGradeLevels") &&
      typeof newProps.gradeLevel.fetchGradeLevels === "object"
    ) {
      this.setState({
        data: newProps.gradeLevel.fetchGradeLevels,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { gradeLevel } = this.props;
    if (gradeLevel.deleteGradeLevel !== prevProps.gradeLevel.deleteGradeLevel) {
      const { deleteGradeLevel } = gradeLevel;
      const { success } = deleteGradeLevel;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteGradeLevel.message || deleteGradeLevel.data,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteGradeLevel,
        data: filteredArray,
      });
    }
  }
  fetchData = () => {
    return fetch(`${BACKEND_URL}/gradelevel/all/?key=${API_KEY}`, {
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
    const { deleteGradeLevel } = this.props;

    adminIDs.forEach((adminID, index) => {
      deleteGradeLevel(adminID);
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
    const { patchGradeLevel, gradeLevel } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          gradeLevel={gradeLevel}
          patchGradeLevel={patchGradeLevel}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { gradeLevel, postGradeLevel } = this.props;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            gradeLevel={gradeLevel}
            postGradeLevel={postGradeLevel}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Grade Levels</h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of gradeLevel"
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
  gradeLevel: state.gradeLevel,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchGradeLevel: () => {
    dispatch(fetchGradeLevel());
  },
  deleteGradeLevel: (adminId) => {
    dispatch(deleteGradeLevel(adminId));
  },
  patchGradeLevel: (data, adminId) => dispatch(patchGradeLevel(data, adminId)),
  postGradeLevel: (data) => dispatch(postGradeLevel(data)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(GradeLevel);
