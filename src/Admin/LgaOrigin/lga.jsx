import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchLgasOrigin,
  deleteLgaOrigin,
  patchLgaOrigin,
  postLgaOrigin,
} from "../../actions/actions_admin_lgaOrigin";
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

class LgaOrigin extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchLgasOrigin } = this.props;
    await fetchLgasOrigin();
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchLgasOrigin } = newProps.lga;
    const { success } = fetchLgasOrigin;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchLgasOrigin.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.lga, "fetchLgasOrigin") &&
      typeof newProps.lga.fetchLgasOrigin === "object"
    ) {
      this.setState({
        data: newProps.lga.fetchLgasOrigin,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { lga } = this.props;
    if (lga.deleteLgaOrigin !== prevProps.lga.deleteLgaOrigin) {
      const { deleteLgaOrigin } = lga;
      const { success } = deleteLgaOrigin;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteLgaOrigin.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteLgaOrigin,
        loading: false,
      });
    }
  }
  fetchData = () => {
    fetch(`${BACKEND_URL}/lgaOrigin/all/?key=${API_KEY}`, {
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

  handleDeleteClick = (lgaIDs) => {
    const { data } = this.state;
    const { deleteLgaOrigin } = this.props;

    lgaIDs.forEach((lgaID, index) => {
      deleteLgaOrigin(lgaID);
      filteredArray = data.filter((datum) => lgaIDs.indexOf(datum._id) === -1);
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
    const { patchLgaOrigin, lga } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          lga={lga}
          patchLga={patchLgaOrigin}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { lga, postLgaOrigin } = this.props;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            lga={lga}
            postLga={postLgaOrigin}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>
              List Of All Local Government Origin
            </h4>
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
  lga: state.lga,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchLgasOrigin: () => {
    dispatch(fetchLgasOrigin());
  },
  deleteLgaOrigin: (adminId) => {
    dispatch(deleteLgaOrigin(adminId));
  },
  patchLgaOrigin: (data, adminId) => dispatch(patchLgaOrigin(data, adminId)),
  postLgaOrigin: (data) => dispatch(postLgaOrigin(data)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(LgaOrigin);
