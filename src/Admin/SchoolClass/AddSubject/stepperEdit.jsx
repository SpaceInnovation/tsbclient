import React, { Component } from "react";
import AddPage from "./details";

class PropertyStepperEdit extends Component {
  render() {
    const {
      onCloseModal,
      patchSchoolSubject,
      eachData,
      schoolSubject,
      fetchData,
    } = this.props;

    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchSchoolSubject={patchSchoolSubject}
            eachData={eachData}
            schoolSubject={schoolSubject}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
