import React, { Component } from "react";
import AddPage from "../Subject/details";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchSubject, eachData, subject, fetchData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchSubject={patchSubject}
            eachData={eachData}
            subject={subject}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
