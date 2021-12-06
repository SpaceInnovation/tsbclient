import React, { Component } from "react";
import AddPage from "./details";

class PropertyStepper extends Component {
  render() {
    const {
      onCloseModal,
      postSchoolClass,
      schoolClass,
      fetchData,
      eachData,
      id,
    } = this.props;
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
            id={id}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
