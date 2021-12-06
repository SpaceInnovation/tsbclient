import React, { Component } from "react";
import AddPage from "../School/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postSchool, school, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postSchool={postSchool}
            school={school}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
