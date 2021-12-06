import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Close from "@material-ui/icons/Close";
import PropertyStepper from "../../Admin/AdminUsers/stepper";
import PropertyStepperEdit from "../../Admin/AdminUsers/stepperEdit";
import { withStyles } from "@material-ui/core";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import AdminUserForm from "./form";
import { Tooltip } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class AddNew extends Component {
  state = {
    modal: false,
  };

  handleClickOpen = () => {
    this.setState({
      modal: true,
    });
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    const { type, classes, patchAdmin, adminUsers, eachData, fetchData } =
      this.props;
    const { modal } = this.state;

    let role;
    try {
      role = adminUsers.fetchOneAdmin ? adminUsers.fetchOneAdmin.role : null;
    } catch (error) {}

    let modalButtonEdit;
    let modalButton;

    let modalContent;

    switch (type) {
      case "add":
        modalButton = (
          <Button
            size="small"
            color="primary"
            onClick={this.handleClickOpen}
            variant="contained"
            style={{ backgroundColor: "#4bc9f9" }}
          >
            Add New Admin
          </Button>
        );
        modalContent = (
          <PropertyStepper
            onCloseModal={this.handleClose}
            modalStatus={modal}
            fetchData={fetchData}
          />
        );
        break;
      case "edit":
        modalButtonEdit = (
          <Tooltip title="Edit">
            <Edit style={{ fontSize: "15px" }} onClick={this.handleClickOpen} />
          </Tooltip>
        );
        modalContent = (
          <PropertyStepperEdit
            onCloseModal={this.handleClose}
            adminUsers={adminUsers}
            eachData={eachData}
            patchAdmin={patchAdmin}
            fetchData={fetchData}
          />
        );
        break;
      case "role":
        modalContent = (
          <AdminUserForm
            onHandleModalClose={this.handleClose}
            eachData={eachData}
            patchAdmin={patchAdmin}
            adminUsers={adminUsers}
            closeParentModal={() => this.handleClose()}
            fetchData={fetchData}
          />
        );
        modalButton = (
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleClickOpen}
            style={{ backgroundColor: "#4bc9f9" }}
          >
            Assign Role
          </Button>
        );
        break;

      default:
        break;
    }
    return (
      <div>
        {role === "super" ? modalButton : modalButtonEdit}
        <Dialog
          fullScreen={false}
          // fullWidth
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          open={modal}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <Close className={classes.modalClose} />
            </IconButton>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            {modalContent}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(modalStyle)(AddNew);
