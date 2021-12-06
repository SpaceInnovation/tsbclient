import React, { Component } from "react";
import AddPage from "../Class/details";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, postClass, classReducer, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="add"
            postClass={postClass}
            classReducer={classReducer}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
