import React, { Component } from "react";
import AddPage from "./details";

class PropertyStepperEdit extends Component {
  render() {
    const {
      onCloseModal,
      patchSchoolTeacher,
      eachData,
      schoolTeacher,
      fetchData,
    } = this.props;

    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchSchoolTeacher={patchSchoolTeacher}
            eachData={eachData}
            schoolTeacher={schoolTeacher}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
