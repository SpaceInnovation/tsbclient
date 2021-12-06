import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchAllocations,
  postAllocation,
  deleteAllocation,
  patchAllocation,
} from "../../actions/actions_admin_allocation";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import Validator from "../../helpers/validator";
import TableCell from "@material-ui/core/TableCell";
import AddNew from "./modal";
import { BACKEND_URL, API_KEY } from "../../actions/api";
import { getFromLocalStorage } from "../../helpers/browserStorage";
import Table from "./table";

const columnData = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "School",
    searchable: true,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Class",
  },
  {
    id: "classType",
    numeric: false,
    disablePadding: true,
    label: "ClassType",
  },
];

let filteredArray;
class Allocation extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchAllocations } = this.props;
    await fetchAllocations();
  }

  componentWillReceiveProps(newProps) {
    const { fetchAllocations } = newProps.allocation;
    console.log("fetchAllocations", fetchAllocations);
    const { success } = fetchAllocations;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchAllocations.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.allocation, "fetchAllocations") &&
      typeof newProps.allocation.fetchAllocations === "object"
    ) {
      this.setState({
        data: newProps.allocation.fetchAllocations,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { allocation } = this.props;
    if (allocation.deleteAllocation !== prevProps.allocation.deleteAllocation) {
      const { deleteAllocation } = allocation;
      const { success } = deleteAllocation;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteAllocation.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteAllocation,
        loading: false,
      });
    }
  }
  fetchData = () => {
    fetch(`${BACKEND_URL}/allocation/all/?key=${API_KEY}`, {
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

  handleDeleteClick = (allocationIDs) => {
    const { data } = this.state;
    const { deleteAllocation } = this.props;

    allocationIDs.forEach((allocationID, index) => {
      deleteAllocation(allocationID);
      filteredArray = data.filter(
        (datum) => allocationIDs.indexOf(datum._id) === -1
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
    const { patchAllocation, allocation } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          allocation={allocation}
          patchAllocation={patchAllocation}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };
  addAllocation = (n) => {
    const { allocation, postAllocation } = this.props;
    return (
      <TableCell>
        <AddNew
          type="add"
          eachData={n}
          allocation={allocation}
          postAllocation={postAllocation}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    return (
      <Fragment>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Allocations</h4>
            <h3>{`[ ${data ? data.length : null} ]`}</h3>
          </div>
          <Table
            columnData={columnData}
            data={data}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of Allocation"
            deleteItem={this.handleDeleteClick}
            editButton={this.editButtonDisplay}
            addAllocationButton={this.addAllocation}
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
  allocation: state.allocation,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchAllocations: () => {
    dispatch(fetchAllocations());
  },
  postAllocation: (data, id) => dispatch(postAllocation(data, id)),
  deleteAllocation: (id) => {
    dispatch(deleteAllocation(id));
  },
  patchAllocation: (data, id) => dispatch(patchAllocation(data, id)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Allocation);
