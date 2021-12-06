import React, { Component } from "react";
import AddPage from "../AdminUsers/adminEditPage";

class PropertyStepperEdit extends Component {
  render() {
    const { onCloseModal, patchAdmin, eachData, adminUsers, fetchData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="edit"
            patchAdmin={patchAdmin}
            eachData={eachData}
            adminUsers={adminUsers}
            fetchData={fetchData}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepperEdit;
