const modalStyle = (theme) => ({
  modal: {
    borderRadius: "6px",
    maxWidth: "1000px",
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px",
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143",
  },
  modalCloseButton: {
    color: "#999999",
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right",
  },
  modalClose: {
    width: "16px",
    height: "16px",
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0",
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  fluidButton: {
    ...theme.button,
    width: "100%",
    fontSize: "18px",
  },
  slide: {
    height: "fit-content !important",
  },
  thumb: {
    position: "static !important",
    "& li": {
      width: "60px !important",
      height: "60px !important",
    },
  },
  menuItemDiv: {
    margin: "10px 28px 0",
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: "normal",
    "&:hover": {
      color: "#FFFFFF",
      boxShadow:
        "0 12px 20px -10px rgba(20, 121, 251, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(20, 121, 251, 0.2)",
      backgroundColor: "#1479fb",
      borderRadius: "5px",
    },
  },
});

export default modalStyle;
