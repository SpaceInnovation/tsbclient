import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core";
import { Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Email from "@material-ui/icons/Email";
import VpnKey from "@material-ui/icons/VpnKey";
import CircularProgress from "@material-ui/core/CircularProgress";
import MysnackBar from "../../components/Snackbar";
import Snackbar from "@material-ui/core/Snackbar";
import { loginValidationSchema } from "../../components/Auth/ValidationSchema";
import { login } from "../../actions/actions_auth";
import { connect } from "react-redux";

const useStyles = () => ({
  container: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    position: "relative",
    top: "150px",
    paddingBottom: "45px",
  },
  h1: {
    backgroundColor: "#fff",
    position: "relative",
    top: "150px",
    width: "170px",
    textAlign: "center",
    height: "70px",
    fontSize: "60px",
    borderRadius: "50px 50px 0 0",
    color: "#074848",
  },
  subtitle: {
    fontSize: "20px",
    marginTop: "20px",
    color: "#074848",
  },
});

const initialState = {
  loading: false,
  email: "",
  password: "",
  open: false,
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarVariant: "error",
};

class Login extends Component {
  state = {
    ...initialState,
  };

  componentDidUpdate(prevProps) {
    const { adminAuth } = this.props;
    if (adminAuth.signin !== prevProps.adminAuth.signin) {
      const { signin } = adminAuth;
      const { success } = signin;
      if (success === false) {
        this.setState({
          snackBarOpen: true,
          snackBarVariant: "error",
          snackBarMessage: signin.message,
          loading: false,
        });
        return null;
      }
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "success",
        snackBarMessage: signin.message,
        loading: false,
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  };

  render() {
    const { classes } = this.props;
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
        const { login } = this.props;
        login(values, "admin");
        this.setState({
          loading: true,
        });
      };

      return (
        <div>
          <Grid
            container
            justifyContent="center"
            style={{ textAlign: "center" }}
          >
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
                    <CircularProgress color="primary" />
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
                // color="secondary"

                style={{
                  fontWeight: "bold",
                  backgroundColor: "#4bc9f9",
                  marginTop: "20px",
                }}
                disabled={!isValid}
              >
                Sign In
              </Button>
            </form>
          </Grid>
        </div>
      );
    };

    return (
      <Fragment>
        <div style={{ backgroundColor: "#4bc9f9", height: "100vh" }}>
          <Grid container item md={12} sm={12} justifyContent="center">
            <Typography component="h1" variant="h3" className={classes.h1}>
              TSB
            </Typography>
          </Grid>
          <Container
            component="main"
            maxWidth="sm"
            className={classes.container}
          >
            <Grid container item md={12} sm={12} justifyContent="center">
              <Typography
                component="h1"
                variant="button"
                className={classes.subtitle}
              >
                Benue State Teaching Service Board
              </Typography>
            </Grid>
            <div>
              <Formik
                initialValues={values}
                validationSchema={loginValidationSchema}
              >
                {(props) => <Form {...props} />}
              </Formik>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackBarOpen}
                onClose={this.onCloseHandler}
              >
                <MysnackBar
                  onClose={this.onCloseHandler}
                  variant={snackBarVariant}
                  message={snackBarMessage}
                />
              </Snackbar>
            </div>
          </Container>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  adminAuth: state.adminAuth,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data, user) => dispatch(login(data, user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Login));
