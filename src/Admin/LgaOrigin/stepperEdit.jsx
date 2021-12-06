import React, { Component } from "react";
import AddPage from "../LgaOrigin/details";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchLga, eachData, lga, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchLga={patchLga}
            eachData={eachData}
            lga={lga}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
