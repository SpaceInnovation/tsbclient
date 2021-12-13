import React, { Component } from "react";
import AddPage from "../AddTeacher/transferDetails";

class PropertyStepper extends Component {
  render() {
    const { onCloseModal, id, postTransfer, posting, fetchData, eachData } =
      this.props;
    return (
      <>
        <div>
          <AddPage
            onCloseModal={onCloseModal}
            pageType="transfer"
            postTransfer={postTransfer}
            posting={posting}
            fetchData={fetchData}
            eachData={eachData}
            id={id}
          />
        </div>
      </>
    );
  }
}

export default PropertyStepper;
