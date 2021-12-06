import React, { Component } from "react";
import AddPage from "./details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postTeacher, teacher, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postTeacher={postTeacher}
            teacher={teacher}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
