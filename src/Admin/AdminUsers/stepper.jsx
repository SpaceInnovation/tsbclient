import React, { Component } from "react";
import AddPage from "../AdminUsers/adminDetails";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, fetchData } = this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            fetchData={fetchData}
            pageType="add"
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
