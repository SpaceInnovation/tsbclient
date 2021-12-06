import React, { Component } from "react";
import AddPage from "../GradeLevel/details";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchGradeLevel, eachData, gradeLevel, fetchData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchGradeLevel={patchGradeLevel}
            eachData={eachData}
            gradeLevel={gradeLevel}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
