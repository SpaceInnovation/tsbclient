import { Grid } from "@material-ui/core";
import React, { Fragment } from "react";
import EnhancedTable from "../../../components/Table/EnhancedTable";
import Typography from "@material-ui/core/Typography";

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

class SchoolTeachers extends React.Component {
  state = {
    data: [],
  };

  componentWillReceiveProps() {
    const { eachData } = this.props;
    if (typeof eachData === "object") {
      setTimeout(() => {
        this.setState({
          data: eachData.teachers,
        });
        return false;
      }, 2000);
    }
  }

  render() {
    const { data } = this.state;
    const { eachData } = this.props;
    return (
      <Fragment>
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            color: "#2196f3",
          }}
        >
          <Typography variant="h5" component="h5">
            {eachData.lga.name}
          </Typography>
        </div>
        <Grid container item xs={12} sm={12} md={12}>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "10px" }}>List Of All Teachers</h4>
            <h3>{`[ ${data ? data.length : null} ]`}</h3>
          </div>
          <EnhancedTable
            columnData={columnData}
            data={data}
            properties={properties}
            id="_id"
            showSearch
            searchPlaceholder="Search Name of School"
          />
        </Grid>
      </Fragment>
    );
  }
}

export default SchoolTeachers;
