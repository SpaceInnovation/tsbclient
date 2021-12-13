import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchLgas,
  deleteLga,
  patchLga,
} from "../../actions/actions_admin_lga";
import EnhancedTable from "./table";
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

let filteredArray;

class Lga extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchLgas } = this.props;
    await fetchLgas();
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    console.log("newProps", newProps);
    const { fetchLgas } = newProps.lgas;
    const { success } = fetchLgas;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchLgas.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.lgas, "fetchLgas") &&
      typeof newProps.lgas.fetchLgas === "object"
    ) {
      this.setState({
        data: newProps.lgas.fetchLgas,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { lgas } = this.props;
    if (lgas.deleteLga !== prevProps.lgas.deleteLga) {
      const { deleteLga } = lgas;
      const { success } = deleteLga;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteLga.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteLga,
        loading: false,
      });
    }
  }
  fetchData = () => {
    fetch(`${BACKEND_URL}/lga/all/?key=${API_KEY}`, {
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
        console.log("json", json);
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
    const { deleteLga } = this.props;

    lgaIDs.forEach((lgaID, index) => {
      deleteLga(lgaID);
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
    const { patchLga, lgas } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          lga={lgas}
          patchLga={patchLga}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  viewSubjects = (n) => {
    return (
      <TableCell>
        <AddNew type="viewSubjects" eachData={n} />
      </TableCell>
    );
  };

  viewTeachers = (n) => {
    return (
      <TableCell>
        <AddNew type="viewTeachers" eachData={n} />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { lgas, postLgas } = this.props;

    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            lgas={lgas}
            postLgas={postLgas}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>
              List Of All Local Government Areas
            </h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of lga"
            deleteItem={this.handleDeleteClick}
            editButton={this.editButtonDisplay}
            viewSubjects={this.viewSubjects}
            viewTeachers={this.viewTeachers}
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
  lgas: state.lgas,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchLgas: () => {
    dispatch(fetchLgas());
  },
  deleteLga: (adminId) => {
    dispatch(deleteLga(adminId));
  },
  patchLga: (data, id) => dispatch(patchLga(data, id)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Lga);
