import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import Validator from "../../helpers/validator";
import isEqual from "lodash/isEqual";
import { CircularProgress } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import {
  postingsPosting,
  fetchSchoolByLgaID,
} from "../../actions/actions_admin_posting";
import { BACKEND_URL, API_KEY } from "../../actions/api";
import { getFromLocalStorage } from "../../helpers/browserStorage";

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
});

const initialstate = {
  lga: "",
  lgaList: [],
  school: "",
  schoolList: [],
  loading: false,
  open: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
  errorMessage: "",
};

class AddPage extends Component {
  state = {
    ...initialstate,
  };

  clearState = () => {
    this.setState({
      ...initialstate,
    });
  };

  async componentDidMount() {
    const { id, postingsPosting } = this.props;
    await postingsPosting(id);
  }
  componentWillReceiveProps(newProps) {
    const { posting, onCloseModal, eachData } = this.props;
    // console.log("eachData", eachData);
    if (typeof newProps.posting.postingsPosting === "object") {
      const data = newProps.posting.postingsPosting;
      this.setState({
        lgaList: data.lgas,
      });
    }
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          name: eachData.name,
        });
      }, 2000);
    }
    if (
      Validator.propertyExist(newProps, "posting", "patchPosting") &&
      isEqual(posting.patchPosting, newProps.posting.patchPosting) === false
    ) {
      setTimeout(() => {
        onCloseModal();
      }, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    const { posting } = this.props;
    if (posting.patchPosting !== prevProps.posting.patchPosting) {
      const { patchPosting } = posting;
      const { success } = patchPosting;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: patchPosting.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: patchPosting,
        loading: false,
      });
    }

    if (posting.postPosting !== prevProps.posting.postPosting) {
      const { postPosting } = posting;
      const { success } = postPosting;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: postPosting.message,
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: postPosting,
        loading: false,
      });
      setTimeout(() => {
        window.location.href = "/postings/employed";
      }, 2000);
    }
  }
  handleLgaChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    fetch(
      `${BACKEND_URL}/postings/fetchSchoolsBylgaid/${value}/?key=${API_KEY}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${
            JSON.parse(getFromLocalStorage("tsb-login:admin")).token
          }`,
        },
        body: JSON.stringify(),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          schoolList: json,
        });
        if (json.error) {
          throw json.error;
        }
      })
      .catch((error) => console.log(error));
  };

  handleSchoolChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  createProperty = (values, e) => {
    e.preventDefault();
    const {
      postPosting,
      pageType,
      patchPosting,
      eachData,
      onCloseModal,
      fetchData,
      posting,
    } = this.props;
    const { schFromID, teacher } = posting.postingsPosting;
    console.log("schFromID", schFromID);

    switch (pageType) {
      case "add":
        postPosting(values, schFromID, teacher._id);
        this.setState({
          loading: true,
        });
        this.clearState();

        setTimeout(() => {
          fetchData();
        }, 2000);

        setTimeout(() => {
          onCloseModal();
        }, 3000);
        break;

      case "edit":
        patchPosting(values, eachData._id);
        this.setState({
          loading: true,
        });
        this.clearState();

        setTimeout(() => {
          fetchData();
        }, 2000);

        setTimeout(() => {
          onCloseModal();
        }, 3000);
        break;

      default:
        break;
    }
  };

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };
  render() {
    console.log("this.props", this.props);

    let {
      lga,
      lgaList,
      school,
      schoolList,
      loading,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
    } = this.state;

    const { classes, postPosting } = this.props;
    const values = { lga, school };
    return (
      <>
        <div>
          <Card>
            {postPosting ? (
              <CardHeader
                title="Add New Posting"
                style={{ color: "#2196f3" }}
              />
            ) : (
              <CardHeader title="Edit Posting" style={{ color: "#2196f3" }} />
            )}
            <CardContent>
              <div style={{ textAlign: "center", justifyContent: "center" }}>
                <form onSubmit={this.createProperty.bind(null, values)}>
                  {loading ? (
                    <div>
                      <Button
                        size="large"
                        style={{
                          fontWeight: "bold",
                          fontSize: "60px",
                        }}
                      >
                        <CircularProgress color="secondary" />
                      </Button>
                      <Typography>Loading Please wait......</Typography>
                    </div>
                  ) : null}
                  <h3 style={{ color: "#2196f3" }}>Posting Details</h3>
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel
                      style={{
                        position: "absolute",
                        left: "15px",
                      }}
                      id="lga-simple-select-label"
                    >
                      LGA
                    </InputLabel>
                    <Select
                      labelId="lga-simple-select-label"
                      // id="selectedLga"
                      value={lga}
                      name="lga"
                      onChange={this.handleLgaChange}
                      variant="outlined"
                      label="LGA"
                      id="lgaID"
                      fullWidth
                      required
                    >
                      {lgaList.length > 0
                        ? lgaList.map((item, key) => (
                            <MenuItem key={key} value={item._id}>
                              {item.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel
                      style={{
                        position: "absolute",
                        left: "15px",
                      }}
                      id="school-simple-select-label"
                    >
                      School
                    </InputLabel>
                    <Select
                      labelId="school-simple-select-label"
                      id="selectedSchool"
                      value={school}
                      name="school"
                      onChange={this.handleSchoolChange}
                      variant="outlined"
                      label="School"
                      fullWidth
                      required
                    >
                      {schoolList.length > 0
                        ? schoolList.map((item, key) => (
                            <MenuItem key={key} value={item._id}>
                              {item.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    fullWidth
                    style={{ fontWeight: "bold", backgroundColor: "#4bc9f9" }}
                  >
                    {postPosting ? " Add New" : "Edit"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
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
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  posting: state.posting,
});

const mapDispatchStateToProps = (dispatch) => ({
  postingsPosting: (id) => {
    dispatch(postingsPosting(id));
  },
  fetchSchoolByLgaID: (id) => {
    dispatch(fetchSchoolByLgaID(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withStyles(styles)(AddPage));
