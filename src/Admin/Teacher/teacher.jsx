import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchTeachers,
  deleteTeacher,
  patchTeacher,
  postTeacher,
} from "../../actions/actions_admin_teacher";
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
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "firstName",
    searchable: true,
  },
  {
    id: "surname",
    numeric: false,
    disablePadding: true,
    label: "surname",
  },
  { id: "phone", numeric: false, disablePadding: true, label: "Phone" },
  { id: "gender", numeric: false, disablePadding: true, label: "Gender" },
  { id: "LGAOrigin", numeric: false, disablePadding: true, label: "LGA" },
];

const properties = [
  {
    name: "firstName",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
  {
    name: "surname",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
  {
    name: "phone",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },

  {
    name: "gender",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
  {
    name: "LGAOrigin",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
];
const imagePanelView = [
  {
    label: "image_front|images",
    imgType: "Teacher Front View",
    fullWidth: true,
    width: 800,
    height: 800,
  },
];

let filteredArray;

class Teachers extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchTeachers } = this.props;
    await fetchTeachers();
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchTeachers } = newProps.teacher;
    const { success } = fetchTeachers;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchTeachers.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.teacher, "fetchTeachers") &&
      typeof newProps.teacher.fetchTeachers === "object"
    ) {
      this.setState({
        data: newProps.teacher.fetchTeachers,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { teacher } = this.props;
    if (teacher.deleteTeacher !== prevProps.teacher.deleteTeacher) {
      const { deleteTeacher } = teacher;
      const { success } = deleteTeacher;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteTeacher.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteTeacher,
      });
    }
  }

  fetchData = () => {
    fetch(`${BACKEND_URL}/teacher/all/?key=${API_KEY}`, {
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
      .catch((error) => console.log(error.message));
  };

  handleDeleteClick = (adminIDs) => {
    const { data } = this.state;
    const { deleteTeacher } = this.props;

    adminIDs.forEach((adminID, index) => {
      deleteTeacher(adminID);
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

  imagePanelDisplay = (n) => {
    const { teacher } = this.props;
    return (
      <TableCell>
        <AddNew
          type="imageUpload"
          teacher={teacher}
          eachData={n}
          imgObj={imagePanelView}
        />
      </TableCell>
    );
  };
  editButtonDisplay = (n) => {
    const { patchTeacher, teacher } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          teacher={teacher}
          patchTeacher={patchTeacher}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { teacher, postTeacher } = this.props;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            teacher={teacher}
            postTeacher={postTeacher}
            fetchData={this.fetchData}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Teachers</h4>
            <h3>{`[ ${data.length} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            tableTitle="All Teachers"
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name"
            imagePanelDisplay={this.imagePanelDisplay}
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
  teacher: state.teacher,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchTeachers: () => {
    dispatch(fetchTeachers());
  },
  deleteTeacher: (adminId) => {
    dispatch(deleteTeacher(adminId));
  },
  patchTeacher: (data, adminId) => dispatch(patchTeacher(data, adminId)),
  postTeacher: (data) => dispatch(postTeacher(data)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Teachers);
