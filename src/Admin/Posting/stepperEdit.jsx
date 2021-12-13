import React, { Component } from "react";
import AddPage from "../Posting/details";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, id, patchPosting, eachData, posting, fetchData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchPosting={patchPosting}
            eachData={eachData}
            posting={posting}
            fetchData={fetchData}
            id={id}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
