import React, { Component } from "react";
import AddPage from "../Posting/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, id, postPosting, posting, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postPosting={postPosting}
            posting={posting}
            fetchData={fetchData}
            id={id}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
