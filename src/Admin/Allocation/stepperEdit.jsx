import React, { Component } from "react";
import AddPage from "../Allocation/details";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchAllocation, eachData, allocation, fetchData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchAllocation={patchAllocation}
            eachData={eachData}
            allocation={allocation}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
