import React, { Component } from "react";
import AddPage from "./details";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchTeacher, eachData, teacher, fetchData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchTeacher={patchTeacher}
            eachData={eachData}
            teacher={teacher}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
