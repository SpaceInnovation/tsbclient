import React, { Component } from "react";
import AddPage from "../Subject/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postSubject, subject, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postSubject={postSubject}
            subject={subject}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
