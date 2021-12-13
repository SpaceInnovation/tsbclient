import React, { Component } from "react";
import AddPage from "./details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postSchoolTeacher, schoolTeacher, fetchData, id } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postSchoolTeacher={postSchoolTeacher}
            schoolTeacher={schoolTeacher}
            fetchData={fetchData}
            id={id}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
