import React, { Component } from "react";
import AddPage from "../SchoolClass/details";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchSchoolClass, eachData, schoolClass, fetchData } =
      this.props;

    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchSchoolClass={patchSchoolClass}
            eachData={eachData}
            schoolClass={schoolClass}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
