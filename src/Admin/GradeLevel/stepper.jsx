import React, { Component } from "react";
import AddPage from "../GradeLevel/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postGradeLevel, gradeLevel, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postGradeLevel={postGradeLevel}
            gradeLevel={gradeLevel}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
