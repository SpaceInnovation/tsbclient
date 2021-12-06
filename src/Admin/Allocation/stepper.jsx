import React, { Component } from "react";
import AddPage from "../Allocation/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postAllocation, allocation, fetchData, eachData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postAllocation={postAllocation}
            allocation={allocation}
            fetchData={fetchData}
            eachData={eachData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
