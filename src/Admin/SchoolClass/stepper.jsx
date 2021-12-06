import React, { Component } from "react";
import AddPage from "../SchoolClass/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postSchoolClass, schoolClass, fetchData, eachData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postSchoolClass={postSchoolClass}
            schoolClass={schoolClass}
            eachData={eachData}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
