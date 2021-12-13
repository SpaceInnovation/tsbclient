import Grid from "@material-ui/core/Grid";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchSchoolClasses,
  deleteSchoolClass,
  patchSchoolClass,
  postSchoolClass,
} from "../../actions/action_admin_school_class";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import TableCell from "@material-ui/core/TableCell";
import AddNew from "./modal";
import Table from "./table";
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

class School extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchSchoolClasses } = this.props;
    await fetchSchoolClasses();
    // this.fetchData();
  }
  fetchData = () => {
    return fetch(`${BACKEND_URL}/schoolClasses/all/?key=${API_KEY}`, {
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

  componentWillReceiveProps(newProps) {
    const { eachData } = this.props;
    const { fetchSchoolClasses } = newProps.schoolClass;
    const success = fetchSchoolClasses ? fetchSchoolClasses.success : null;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchSchoolClasses.message,
        loading: false,
      });
      return false;
    }
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          data: eachData.classes,
        });
        return false;
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { schoolClass } = this.props;
    if (
      schoolClass.deleteSchoolClass !== prevProps.schoolClass.deleteSchoolClass
    ) {
      const { deleteSchoolClass } = schoolClass;
      const { success } = deleteSchoolClass;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deleteSchoolClass.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deleteSchoolClass,
        loading: false,
      });
    }
  }

  handleDeleteClick = (schoolClassIDs) => {
    const { data } = this.state;
    const { deleteSchoolClass } = this.props;
    schoolClassIDs.forEach((schoolClassID, index) => {
      deleteSchoolClass(schoolClassID);
      filteredArray = data.filter(
        (datum) => schoolClassIDs.indexOf(datum._id) === -1
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
    return (
      <TableCell>
        <AddNew type="imageUpload" eachData={n} />
      </TableCell>
    );
  };

  editButtonDisplay = (n) => {
    const { patchSchoolClass, schoolClass } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          schoolClass={schoolClass}
          patchSchoolClass={patchSchoolClass}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    // const { schoolClass, postSchoolClass, eachData, match } = this.props;
    const { match } = this.props;
    const { id } = match.params;

    return (
      <Fragment>
        <Grid container>
          <Grid item xs={12} sm={4} md={4}>
            <AddNew
              type="add"
              // data={data}
              id={id}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <AddNew type="addSubject" id={id} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <AddNew type="addTeacher" id={id} />
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={12} md={12}>
          <Table
            columnData={columnData}
            data={data}
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of School"
            deleteItem={this.handleDeleteClick}
            editButton={this.editButtonDisplay}
            imagePanelDisplay={this.imagePanelDisplay}
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
  schoolClass: state.schoolClass,
});

const mapDispatchStateToProps = (dispatch) => ({
  // School
  fetchSchoolClasses: () => {
    dispatch(fetchSchoolClasses());
  },
  deleteSchoolClass: (id) => {
    dispatch(deleteSchoolClass(id));
  },
  patchSchoolClass: (data, id) => dispatch(patchSchoolClass(data, id)),
  postSchoolClass: (data, id) => {
    dispatch(postSchoolClass(data, id));
  },
});

export default connect(mapStateToProps, mapDispatchStateToProps)(School);
