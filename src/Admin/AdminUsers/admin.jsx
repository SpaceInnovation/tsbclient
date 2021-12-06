import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchAdmin,
  deleteAdmin,
  patchAdmin,
  fetchOneAdmin,
} from "../../actions/actions_admin_users";
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
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "Username",
    searchable: true,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
    searchable: true,
  },
  {
    id: "role",
    numeric: false,
    disablePadding: true,
    label: "Role",
    searchable: true,
  },
];

const properties = [
  {
    name: "username",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
  {
    name: "email",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
  {
    name: "role",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
];

let filteredArray;
let role;

class AdminUsers extends React.Component {
  state = {
    data: [],
    name: "",
    password: "",
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchAdmin, fetchOneAdmin } = this.props;
    try {
      await fetchOneAdmin(
        JSON.parse(getFromLocalStorage("tsb-login:admin")).profile._id
      );
    } catch (error) {}
    await fetchAdmin();
    await this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchOneAdmin } = newProps.adminUsers;
    try {
      role = fetchOneAdmin ? fetchOneAdmin.role : null;
    } catch (error) {}
    if (role !== "super") {
      this.setState({
        data: [newProps.adminUsers.fetchOneAdmin],
      });
      return null;
    }

    if (
      Validator.propertyExist(newProps.adminUsers, "fetchAdmin") &&
      typeof newProps.adminUsers.fetchAdmin === "object"
    ) {
      this.setState({
        data: newProps.adminUsers.fetchAdmin,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { adminUsers } = this.props;
    if (adminUsers.deleteAdmin !== prevProps.adminUsers.deleteAdmin) {
      const { deleteAdmin } = adminUsers;
      const { success } = deleteAdmin;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteAdmin.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteAdmin,
        data: filteredArray,
      });
    }
  }

  fetchData = async () => {
    const { fetchOneAdmin } = this.props.adminUsers;
    try {
      role = fetchOneAdmin ? fetchOneAdmin.role : null;
    } catch (error) {}
    if (role !== "super") {
      this.setState({
        data: [fetchOneAdmin],
      });
      return false;
    }
    return await fetch(`${BACKEND_URL}/admin/all/?key=${API_KEY}`, {
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
    const { deleteAdmin } = this.props;

    adminIDs.forEach((adminID, index) => {
      deleteAdmin(adminID);
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

  updateAdminRole = (n) => {
    const { adminUsers, patchAdmin } = this.props;
    return (
      <TableCell>
        <AddNew
          type="role"
          eachData={n}
          adminUsers={adminUsers}
          patchAdmin={patchAdmin}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };
  editButtonDisplay = (n) => {
    const { patchAdmin, adminUsers } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          adminUsers={adminUsers}
          patchAdmin={patchAdmin}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { adminUsers } = this.props;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            adminUsers={adminUsers}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Admins</h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            tableTitle="All Admins"
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Username"
            viewItem={this.updateAdminRole}
            deleteItem={this.handleDeleteClick}
            editButton={this.editButtonDisplay}
            adminUsers={adminUsers}
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
  adminUsers: state.adminUsers,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchOneAdmin: (adminId) => {
    dispatch(fetchOneAdmin(adminId));
  },
  fetchAdmin: () => {
    dispatch(fetchAdmin());
  },
  deleteAdmin: (adminId) => {
    dispatch(deleteAdmin(adminId));
  },
  patchAdmin: (data, adminId) => dispatch(patchAdmin(data, adminId)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(AdminUsers);
