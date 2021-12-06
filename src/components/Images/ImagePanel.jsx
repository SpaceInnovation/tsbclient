import React from "react";
import Grid from "@material-ui/core/Grid";
import Info from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Validator from "../../helpers/validator";
import IMG_DEFAULT from "@material-ui/core/Avatar";
import { Card, CardContent } from "@material-ui/core";

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

  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { teacherDetails } = this.state;
    const { imageURL } = teacherDetails;
    const { classes } = this.props;
    const imageStyle = { width: "50%", padding: "5px", border: "1px solid" };
    return (
      <div>
        <Card>
          <CardContent>
            <Grid container>
              <Grid
                Item
                xs={12}
                sm={12}
                md={6}
                style={{ height: "fit-content" }}
              >
                <img
                  src={teacherDetails ? imageURL : IMG_DEFAULT}
                  style={imageStyle}
                  alt={teacherDetails ? teacherDetails.surname : ""}
                />
              </Grid>
              <Grid Item xs={12} sm={12} md={6}>
                <Typography className={classes.heading}>
                  <Info className={classes.iconPositionBottom} />
                  &nbsp;Teacher Information
                </Typography>
                <p>
                  Surname:&nbsp;
                  {Validator.propertyExist(teacherDetails, "surname")
                    ? teacherDetails.surname
                    : null}
                </p>{" "}
                <p>
                  First Name:&nbsp;
                  {Validator.propertyExist(teacherDetails, "firstName")
                    ? teacherDetails.firstName
                    : null}
                </p>
                <p>
                  Other Names:&nbsp;
                  {Validator.propertyExist(teacherDetails, "otherNames")
                    ? teacherDetails.otherNames
                    : null}
                </p>{" "}
                <p>
                  Phone number:&nbsp;
                  {Validator.propertyExist(teacherDetails, "phone")
                    ? teacherDetails.phone
                    : null}
                </p>
                <p>
                  Address:&nbsp;
                  {Validator.propertyExist(
                    teacherDetails,

                    "address"
                  )
                    ? teacherDetails.address
                    : null}
                </p>
                <p>
                  Email:&nbsp;
                  {Validator.propertyExist(teacherDetails, "email")
                    ? teacherDetails.email
                    : null}
                </p>
                <p>
                  NIN:&nbsp;
                  {Validator.propertyExist(teacherDetails, "NIN")
                    ? teacherDetails.NIN
                    : null}
                </p>
                <p>
                  Age:&nbsp;
                  {Validator.propertyExist(teacherDetails, "age")
                    ? teacherDetails.age
                    : null}
                </p>
                <p>
                  Appoinment Date:&nbsp;
                  {Validator.propertyExist(teacherDetails, "appointmentDate")
                    ? teacherDetails.appointmentDate
                    : null}
                </p>
                <p>
                  Disability:&nbsp;
                  {Validator.propertyExist(teacherDetails, "disability")
                    ? teacherDetails.disability
                    : null}
                </p>
                <p>
                  Date Of Birth:&nbsp;
                  {Validator.propertyExist(teacherDetails, "dob")
                    ? teacherDetails.dob
                    : null}
                </p>
                <p>
                  Grade Level:&nbsp;
                  {Validator.propertyExist(teacherDetails, "gradeLevel")
                    ? teacherDetails.gradeLevel.name
                    : null}
                </p>
                <p>
                  Marital Status:&nbsp;
                  {Validator.propertyExist(teacherDetails, "maritalStatus")
                    ? teacherDetails.maritalStatus
                    : null}
                </p>
                <p>
                  Nationality:&nbsp;
                  {Validator.propertyExist(teacherDetails, "nationality")
                    ? teacherDetails.nationality
                    : null}
                </p>{" "}
                <p>
                  Qualification:&nbsp;
                  {Validator.propertyExist(teacherDetails, "qualification")
                    ? teacherDetails.qualification.name
                    : null}
                </p>{" "}
                <p>
                  RetirementYear:&nbsp;
                  {Validator.propertyExist(teacherDetails, "retirementYear")
                    ? teacherDetails.retirementYear
                    : null}
                </p>{" "}
                <p>
                  Spouse:&nbsp;
                  {Validator.propertyExist(teacherDetails, "spouse")
                    ? teacherDetails.spouse
                    : null}
                </p>{" "}
                <p>
                  StaffID:&nbsp;
                  {Validator.propertyExist(teacherDetails, "staffID")
                    ? teacherDetails.staffID
                    : null}
                </p>{" "}
                <p>
                  StateOrigin:&nbsp;
                  {Validator.propertyExist(teacherDetails, "stateOrigin")
                    ? teacherDetails.stateOrigin
                    : null}
                </p>{" "}
                <p>
                  Status:&nbsp;
                  {Validator.propertyExist(teacherDetails, "status")
                    ? teacherDetails.status
                    : null}
                </p>{" "}
                <p>
                  Subject:&nbsp;
                  {Validator.propertyExist(teacherDetails, "subject")
                    ? teacherDetails.subject
                    : null}
                </p>
                <p>
                  Title:&nbsp;
                  {Validator.propertyExist(teacherDetails, "title")
                    ? teacherDetails.title
                    : null}
                </p>
                {/* <p>
                  Title:&nbsp;
                  {Validator.propertyExist(teacherDetails, "nextOfKin")
                    ? teacherDetails.nextOfKin.relationship
                    : null}
                </p> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ImagePanel);
