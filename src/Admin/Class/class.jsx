import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchClasses,
  deleteClass,
  patchClass,
  postClass,
} from "../../actions/actions_admin_class";
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

class Class extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchClasses } = this.props;
    await fetchClasses();
  }

  componentWillReceiveProps(newProps) {
    const { fetchClasses } = newProps.classReducer;
    const { success } = fetchClasses;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchClasses.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.classReducer, "fetchClasses") &&
      typeof newProps.classReducer.fetchClasses === "object"
    ) {
      this.setState({
        data: newProps.classReducer.fetchClasses,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { classReducer } = this.props;
    if (classReducer.deleteClass !== prevProps.classReducer.deleteClass) {
      const { deleteClass } = classReducer;
      const { success } = deleteClass;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteClass.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteClass,
        loading: false,
      });
    }
  }
  fetchData = () => {
    fetch(`${BACKEND_URL}/class/all/?key=${API_KEY}`, {
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
    const { deleteClass } = this.props;

    adminIDs.forEach((adminID, index) => {
      deleteClass(adminID);
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
    const { patchClass, classReducer } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          classReducer={classReducer}
          patchClass={patchClass}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { classReducer, postClass } = this.props;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            classReducer={classReducer}
            postClass={postClass}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Classes</h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of classReducer"
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
  classReducer: state.classReducer,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchClasses: () => {
    dispatch(fetchClasses());
  },
  deleteClass: (id) => {
    dispatch(deleteClass(id));
  },
  patchClass: (data, id) => dispatch(patchClass(data, id)),
  postClass: (data) => dispatch(postClass(data)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Class);
