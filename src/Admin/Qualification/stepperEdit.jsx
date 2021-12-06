import React, { Component } from "react";
import AddPage from "../Qualification/details";

class PropertyStepperEdit extends Component {
  render() {
    const {
      onCloseModal,
      patchQualification,
      eachData,
      qualification,
      fetchData,
    } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchQualification={patchQualification}
            eachData={eachData}
            qualification={qualification}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
