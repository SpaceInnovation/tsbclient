import {
  FETCH_ALL_CLASSES,
  POST_CLASS,
  DELETE_CLASS,
  PATCH_CLASS,
} from "../actions/types";

const INITIALSTATE = {};

const ClasstReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_CLASSES:
      output = { ...state, fetchClasses: action.payload };
      break;
    case PATCH_CLASS:
      output = { ...state, patchClass: action.payload };
      break;
    case DELETE_CLASS:
      output = { ...state, deleteClass: action.payload };
      break;
    case POST_CLASS:
      output = { ...state, postClass: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default ClasstReducer;
