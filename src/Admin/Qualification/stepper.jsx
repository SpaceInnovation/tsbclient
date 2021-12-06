import React, { Component } from "react";
import AddPage from "../Qualification/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postQualification, qualification, fetchData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postQualification={postQualification}
            qualification={qualification}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
