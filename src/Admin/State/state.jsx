import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchStates,
  deleteState,
  patchState,
  postState,
} from "../../actions/actions_admin_state";
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

class State extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchStates } = this.props;
    await fetchStates();
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchStates } = newProps.state;
    const { success } = fetchStates;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchStates.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.state, "fetchStates") &&
      typeof newProps.state.fetchStates === "object"
    ) {
      this.setState({
        data: newProps.state.fetchStates,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { state } = this.props;
    if (state.deleteState !== prevProps.state.deleteState) {
      const { deleteState } = state;
      const { success } = deleteState;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteState.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteState,
        loading: false,
      });
    }
  }
  fetchData = () => {
    fetch(`${BACKEND_URL}/states/index/?key=${API_KEY}`, {
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

  handleDeleteClick = (stateIDs) => {
    const { data } = this.state;
    const { deleteState } = this.props;

    stateIDs.forEach((stateID, index) => {
      deleteState(stateID);
      filteredArray = data.filter(
        (datum) => stateIDs.indexOf(datum._id) === -1
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
    const { patchState, state } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          state={state}
          patchState={patchState}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { state, postState } = this.props;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            state={state}
            postState={postState}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All States</h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of lga"
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
  state: state.state,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchStates: () => {
    dispatch(fetchStates());
  },
  deleteState: (adminId) => {
    dispatch(deleteState(adminId));
  },
  patchState: (data, adminId) => dispatch(patchState(data, adminId)),
  postState: (data) => dispatch(postState(data)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(State);
