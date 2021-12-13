import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchPostingsEmployed } from "../../actions/actions_admin_posting";
import EnhancedTable from "./table";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import Validator from "../../helpers/validator";
// import AddNew from "./modal";

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
  { id: "serial", numeric: false, disablePadding: true, label: "SerialNo." },
  {
    id: "servedYears",
    numeric: false,
    disablePadding: true,
    label: "ServedYears",
  },
  {
    id: "retirementYear",
    numeric: false,
    disablePadding: true,
    label: "RetirementYear",
  },
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
    name: "serial",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },

  {
    name: "servedYears",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
  {
    name: "retirementYear",
    component: true,
    padding: true,
    numeric: false,
    img: false,
  },
];

class Teachers extends React.Component {
  state = {
    data: [],
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarVariant: "error",
  };

  async componentDidMount() {
    const { fetchPostingsEmployed } = this.props;
    await fetchPostingsEmployed();
  }

  componentWillReceiveProps(newProps) {
    const { fetchPostingsEmployed } = newProps.posting;
    const { success } = fetchPostingsEmployed;
    if (success === false) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "error",
        snackBarMessage: fetchPostingsEmployed.message,
        loading: false,
      });
      return false;
    }
    if (
      Validator.propertyExist(newProps.posting, "fetchPostingsEmployed") &&
      typeof newProps.posting.fetchPostingsEmployed === "object"
    ) {
      this.setState({
        data: newProps.posting.fetchPostingsEmployed,
      });
    } else return null;
  }
  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  render() {
    const { data, snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    return (
      <Fragment>
        {/* <Grid container>
          <AddNew
            type="add"
            data={data}
            teacher={teacher}
            postTeacher={postTeacher}
            fetchData={this.fetchData}
          />
        </Grid> */}
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
  fetchPostingsEmployed: () => {
    dispatch(fetchPostingsEmployed());
  },
});

export default connect(mapStateToProps, mapDispatchStateToProps)(Teachers);
