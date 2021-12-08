import React, { Component } from "react";
import AddPage from "./details";

class PropertyStepper extends Component {
  render() {
    const {
      onCloseModal,
      postSchoolSubject,
      schoolSubject,
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
            postSchoolSubject={postSchoolSubject}
            schoolSubject={schoolSubject}
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
