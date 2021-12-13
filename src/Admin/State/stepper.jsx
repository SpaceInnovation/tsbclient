import React, { Component } from "react";
import AddPage from "../State/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postState, state, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postState={postState}
            state={state}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
