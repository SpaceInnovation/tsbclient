import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchAllPostings,
  deletePosting,
  patchPosting,
  postPosting,
} from "../../actions/actions_admin_posting";
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
    id: "postedDate",
    numeric: false,
    disablePadding: true,
    label: "PostedDate",
    searchable: true,
  },
  {
    id: "serial",
    numeric: false,
    disablePadding: true,
    label: "Serial",
    searchable: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
    searchable: true,
  },
  {
    id: "year",
    numeric: false,
    disablePadding: true,
    label: "Year",
    searchable: true,
  },
];

const properties = [
  {
    name: "postedDate",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
  {
    name: "serial",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
  {
    name: "status",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
  {
    name: "year",
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
    const { fetchAllPostings } = this.props;
    await fetchAllPostings();
    this.fetchData();
  }

  componentWillReceiveProps(newProps) {
    const { fetchAllPostings } = newProps.posting;
    const { success } = fetchAllPostings;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchAllPostings.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.posting, "fetchAllPostings") &&
      typeof newProps.posting.fetchAllPostings === "object"
    ) {
      this.setState({
        data: newProps.posting.fetchAllPostings,
      });
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const { posting } = this.props;
    if (posting.deletePosting !== prevProps.posting.deletePosting) {
      const { deletePosting } = posting;
      const { success } = deletePosting;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: deletePosting.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        data: filteredArray,
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: deletePosting,
        loading: false,
      });
    }
  }
  fetchData = () => {
    fetch(`${BACKEND_URL}/postings/all/?key=${API_KEY}`, {
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

  handleDeleteClick = (postingIDs) => {
    const { data } = this.state;
    const { deletePosting } = this.props;

    postingIDs.forEach((postingID, index) => {
      deletePosting(postingID);
      filteredArray = data.filter(
        (datum) => postingIDs.indexOf(datum._id) === -1
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
    const { patchPosting, posting } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          posting={posting}
          patchPosting={patchPosting}
          fetchData={this.fetchData}
        />
      </TableCell>
    );
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    const { posting, postPosting, match } = this.props;
    const { id } = match.params;
    return (
      <Fragment>
        <Grid container>
          <AddNew
            type="add"
            data={data}
            posting={posting}
            postPosting={postPosting}
            fetchData={this.fetchData}
            id={id}
          />
        </Grid>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Postings</h4>
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
  posting: state.posting,
});

const mapDispatchStateToProps = (dispatch) => ({
  fetchAllPostings: () => {
    dispatch(fetchAllPostings());
  },
  deletePosting: (id) => {
    dispatch(deletePosting(id));
  },
  patchPosting: (data, adminId) => dispatch(patchPosting(data, adminId)),
  postPosting: (data, schFromID, teacherID) =>
    dispatch(postPosting(data, schFromID, teacherID)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(LgaOrigin);
