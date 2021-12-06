import React from "react";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Desc from "@material-ui/icons/Description";
import Info from "@material-ui/icons/Info";
import Detail from "@material-ui/icons/Assessment";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanelSummary from "@material-ui/core/AccordionSummary";
import ExpansionPanelDetails from "@material-ui/core/AccordionDetails";
import ExpansionPanel from "@material-ui/core/Accordion";
import Validator from "../../helpers/validator";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";

const styles = (theme) => ({
  iconPositionBottom: {
    verticalAlign: "bottom",
  },
});

class SchoolPanel extends React.Component {
  constructor(props) {
    super(props);
    const { eachData } = this.props;
    this.state = {
      expanded: null,
      schoolDetails: eachData,
    };
  }

  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { schoolDetails, expanded } = this.state;
    console.log("schoolDetails", schoolDetails);
    const { classes, children } = this.props;
    return (
      <div>
        <Card>
          <CardHeader
            title={`${schoolDetails.name}`}
            style={{ color: "#2196f3" }}
          />
          <CardContent>
            <Grid container>
              <Grid Item xs={12} sm={12} md={12}>
                <ExpansionPanel
                  expanded={expanded === "panel1"}
                  onChange={this.handleChange("panel1")}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      <Desc className={classes.iconPositionBottom} />
                      &nbsp;Classes
                    </Typography>
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <Typography>
                      {Validator.propertyExist(schoolDetails, "classes")
                        ? schoolDetails.classes.map((data) => {
                            return data.name;
                          })
                        : null}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={expanded === "panel2"}
                  onChange={this.handleChange("panel2")}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      <Info className={classes.iconPositionBottom} />
                      &nbsp;Teachers
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ display: "block" }}>
                    <Typography>
                      {Validator.propertyExist(schoolDetails, "teachers")
                        ? schoolDetails.teachers.map((data) => {
                            return data.name;
                          })
                        : null}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={expanded === "panel3"}
                  onChange={this.handleChange("panel3")}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      <Detail className={classes.iconPositionBottom} />
                      &nbsp;Subjects
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      {Validator.propertyExist(schoolDetails, "subjects")
                        ? schoolDetails.subjects.map((data) => {
                            return data.name;
                          })
                        : null}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                {children !== undefined ? children : null}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SchoolPanel);
