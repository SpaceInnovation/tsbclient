import React from "react";
import Grid from "@material-ui/core/Grid";
import Info from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Validator from "../../helpers/validator";
import IMG_DEFAULT from "@material-ui/core/Avatar";
import CoatOfArm from "../../assets/img/coatofarm.jpeg";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";

const styles = (theme) => ({
  displayMargin: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  russoOneFF: {
    fontFamily: "'Russo One', 'Open Sans'",
  },
  TypePoMariginTop: {
    marginTop: "15px !important",
  },
  TypePoMariginBottom: {
    marginBottom: "10px !important",
  },
  fullWidth: {
    width: "100%",
    fontSize: "20px",
  },
  iconPositionBottom: {
    verticalAlign: "bottom",
  },
});

class ImagePanel extends React.Component {
  constructor(props) {
    super(props);
    const { eachData } = this.props;
    this.state = {
      teacherDetails: eachData,
    };
  }

  render() {
    const print = () => {
      window.print();
    };
    const { teacherDetails } = this.state;
    const { imageURL } = teacherDetails;
    const { classes } = this.props;
    const imageStyle = { width: "80%", padding: "5px", height: "65%" };
    return (
      <div>
        <Card>
          <CardContent>
            <Grid container style={{ fontFamily: "initial" }}>
              <Grid Item xs={12} sm={12} md={12}>
                <Typography
                  variant="h5"
                  component="h5"
                  style={{ color: "#2196f3", textAlign: "center" }}
                >
                  BENUE STATE TEACHING SERVICE BOARD
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  Makurdi, Benue State, km2 high way mkd
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{ textAlign: "center", fontFamily: "initial" }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <img
                  src={CoatOfArm}
                  alt="Passport"
                  width="30%"
                  style={{ borderRadius: "20px" }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <div>
                  <Typography>Phone: 4567890-098765 </Typography>
                  <Typography> Email: tsbms@gmail.com</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <img
                  src={CoatOfArm}
                  alt="Passport"
                  width="30%"
                  style={{ borderRadius: "20px" }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid Item xs={12} sm={12} md={12}>
                <Typography style={{ textAlign: "center" }}>
                  <Info className={classes.iconPositionBottom} />
                  &nbsp;Teacher Profile Information
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8} sm={10} md={10}>
                <Typography variant="body1" style={{ color: "#2196f3" }}>
                  Biodata
                </Typography>
              </Grid>
              <Grid item xs={4} sm={2} md={2}>
                <Button
                  onClick={print}
                  variant="contained"
                  style={{
                    background: "green",
                    borderRadius: "5px",
                    padding: "2px 10px",
                    color: "white",
                  }}
                >
                  Print
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              style={{
                fontSize: "17px",
                marginBottom: "5px",
              }}
            >
              <Grid Item xs={8} sm={10} md={10}>
                <Typography>
                  StaffID:&nbsp;
                  {Validator.propertyExist(teacherDetails, "staffID")
                    ? teacherDetails.staffID
                    : null}
                </Typography>
                <Typography>
                  Surname:&nbsp;
                  {Validator.propertyExist(teacherDetails, "surname")
                    ? teacherDetails.surname
                    : null}
                </Typography>
                <Typography>
                  First Name:&nbsp;
                  {Validator.propertyExist(teacherDetails, "firstName")
                    ? teacherDetails.firstName
                    : null}
                </Typography>
                <Typography>
                  Marital Status:&nbsp;
                  {Validator.propertyExist(teacherDetails, "maritalStatus")
                    ? teacherDetails.maritalStatus
                    : null}
                </Typography>
                <Typography>
                  NIN:&nbsp;
                  {Validator.propertyExist(teacherDetails, "NIN")
                    ? teacherDetails.NIN
                    : null}
                </Typography>
                <Typography>
                  Date Of Birth:&nbsp;
                  {Validator.propertyExist(teacherDetails, "dob")
                    ? teacherDetails.dob
                    : null}
                </Typography>
                <Typography>
                  Age:&nbsp;
                  {Validator.propertyExist(teacherDetails, "age")
                    ? teacherDetails.age
                    : null}
                </Typography>
              </Grid>
              <Grid item={4} sm={2} md={2}>
                <img
                  src={teacherDetails ? imageURL : IMG_DEFAULT}
                  style={imageStyle}
                  alt={teacherDetails ? teacherDetails.imageURL : ""}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} md={6}>
                <Typography variant="body1" style={{ color: "#2196f3" }}>
                  Contact Details
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Typography variant="body1" style={{ color: "#2196f3" }}>
                  Employment Details
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container style={{ fontSize: "17px" }}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>
                  Phone number:&nbsp;
                  {Validator.propertyExist(teacherDetails, "phone")
                    ? teacherDetails.phone
                    : null}
                </Typography>
                <Typography>
                  Email:&nbsp;
                  {Validator.propertyExist(teacherDetails, "email")
                    ? teacherDetails.email
                    : null}
                </Typography>
                <Typography>
                  Address:&nbsp;
                  {Validator.propertyExist(
                    teacherDetails,

                    "address"
                  )
                    ? teacherDetails.address
                    : null}
                </Typography>
                <Typography>
                  Local Government Origin:&nbsp;
                  {Validator.propertyExist(
                    teacherDetails,

                    "LGAOrigin"
                  )
                    ? teacherDetails.LGAOrigin
                    : null}
                </Typography>
                <Typography>
                  State Of Origin:&nbsp;
                  {Validator.propertyExist(teacherDetails, "stateOrigin")
                    ? teacherDetails.stateOrigin
                    : null}
                </Typography>
                <Typography>
                  Nationality:&nbsp;
                  {Validator.propertyExist(teacherDetails, "nationality")
                    ? teacherDetails.nationality
                    : null}
                </Typography>{" "}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>
                  Appoinment Date:&nbsp;
                  {Validator.propertyExist(teacherDetails, "appointmentDate")
                    ? teacherDetails.appointmentDate
                    : null}
                </Typography>
                <Typography>
                  Grade Level:&nbsp;
                  {Validator.propertyExist(teacherDetails, "gradeLevel")
                    ? teacherDetails.gradeLevel.name
                    : null}
                </Typography>
                <Typography>
                  Appoinment Status:&nbsp;
                  {Validator.propertyExist(teacherDetails, "status")
                    ? teacherDetails.status
                    : null}
                </Typography>
                <Typography>
                  RetirementYear:&nbsp;
                  {Validator.propertyExist(teacherDetails, "retirementYear")
                    ? teacherDetails.retirementYear
                    : null}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} sm={6} md={6}>
                <Typography variant="body1" style={{ color: "#2196f3" }}>
                  Educational Qualification
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Typography variant="body1" style={{ color: "#2196f3" }}>
                  Next Of Kin
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container style={{ fontSize: "17px" }}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>
                  Qualification:&nbsp;
                  {Validator.propertyExist(teacherDetails, "qualification")
                    ? teacherDetails.qualification.name
                    : null}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>
                  Name:&nbsp;
                  {Validator.propertyExist(teacherDetails, "nextOfKin")
                    ? teacherDetails.nextOfKin.name
                    : null}
                </Typography>
                <Typography>
                  Occupation:&nbsp;
                  {Validator.propertyExist(teacherDetails, "nextOfKin")
                    ? teacherDetails.nextOfKin.occupation
                    : null}
                </Typography>
                <Typography>
                  Address:&nbsp;
                  {Validator.propertyExist(teacherDetails, "nextOfKin")
                    ? teacherDetails.nextOfKin.address
                    : null}
                </Typography>
                <Typography>
                  Phone:&nbsp;
                  {Validator.propertyExist(teacherDetails, "nextOfKin")
                    ? teacherDetails.nextOfKin.phone
                    : null}
                </Typography>
                <Typography>
                  Relationship:&nbsp;
                  {Validator.propertyExist(teacherDetails, "nextOfKin")
                    ? teacherDetails.nextOfKin.relationship
                    : null}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ImagePanel);
