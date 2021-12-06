import React, { Component } from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import VpnKey from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbar from "../../components/Snackbar";
import { CircularProgress } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import { connect } from "react-redux";
import { signup } from "../../actions/actions_auth";
import { SingupValidationSchema } from "../../components/Auth/ValidationSchema";

const initialstate = {
  loading: false,
  email: "",
  password: "",
  open: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
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

  componentDidUpdate(prevProps) {
    const { adminAuth, onCloseModal } = this.props;
    if (adminAuth.signup !== prevProps.adminAuth.signup) {
      const { signup } = adminAuth;
      const { success } = signup;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: signup.message || "Email Already Exist",
          loading: false,
        });
        return false;
      }

      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: signup,
        loading: false,
      });
    }
    setTimeout(() => {
      onCloseModal();
    }, 3000);
  }
  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  render() {
    let {
      email,
      password,
      loading,
      snackBarMessage,
      snackBarOpen,
      snackBarVariant,
    } = this.state;

    email = email.trim();
    password = password.trim();

    const values = { email, password };

    const Form = (props) => {
      const {
        handleChange,
        errors,
        touched,
        values,
        setFieldTouched,
        isValid,
      } = props;

      const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
      };

      const handleSubmit = (values, e) => {
        e.preventDefault();
        const { signup, fetchData, onCloseModal } = this.props;
        signup(values, "admin");
        setTimeout(() => {
          fetchData();
        }, 2000);
        setTimeout(() => {
          onCloseModal();
        }, 3000);
        this.setState({
          loading: true,
        });
      };

      return (
        <div style={{ textAlign: "center", justifyContent: "center" }}>
          <form onSubmit={handleSubmit.bind(null, values)}>
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

            <TextField
              required
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              variant="standard"
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              value={values.email}
              autoComplete="email"
              onChange={change.bind(null, "email")}
              fullWidth
              InputProps={{
                endAdornment: <Email />,
                type: "email",
              }}
            />
            <TextField
              required
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              variant="standard"
              margin="normal"
              name="password"
              label="Password"
              id="password"
              value={values.password}
              onChange={change.bind(null, "password")}
              fullWidth
              InputProps={{
                endAdornment: <VpnKey />,
                type: "password",
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              style={{ fontWeight: "bold", backgroundColor: "#4bc9f9" }}
              disabled={!isValid}
            >
              Add New
            </Button>
          </form>
        </div>
      );
    };

    return (
      <>
        <div>
          <Card>
            <CardHeader title="Add New Admin" style={{ color: "#4bc9f9" }} />
            <CardContent>
              <h3 style={{ color: "#4bc9f9" }}>Admin Details</h3>
              <Formik
                initialValues={values}
                validationSchema={SingupValidationSchema}
              >
                {(props) => <Form {...props} />}
              </Formik>
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
  adminAuth: state.adminAuth,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (data, user) => dispatch(signup(data, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPage);
