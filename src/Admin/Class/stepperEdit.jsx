import React, { Component } from "react";
import AddPage from "../Class/details";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchClass, eachData, classReducer, fetchData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchClass={patchClass}
            eachData={eachData}
            classReducer={classReducer}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
