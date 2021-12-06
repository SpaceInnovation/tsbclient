import React, { Component } from "react";
import AddPage from "../LgaOrigin/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postLga, lga, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postLga={postLga}
            lga={lga}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
