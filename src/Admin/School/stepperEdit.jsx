import React, { Component } from "react";
import AddPage from "../School/editDetails";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchSchool, eachData, school, fetchData } =
      this.props;

    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchSchool={patchSchool}
            eachData={eachData}
            school={school}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
