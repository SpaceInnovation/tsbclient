import React, { Component } from "react";
import AddPage from "../State/details";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchState, eachData, state, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchState={patchState}
            eachData={eachData}
            state={state}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
