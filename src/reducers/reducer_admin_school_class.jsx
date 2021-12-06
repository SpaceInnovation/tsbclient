import {
  FETCH_SCHOOL_CLASSES,
  DELETE_SCHOOL_CLASS,
  POST_SCHOOL_CLASS,
  PATCH_SCHOOL_CLASS,
} from "../actions/types";

const INITIALSTATE = {};

const schoolClassReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_SCHOOL_CLASSES:
      output = { ...state, fetchSchoolClasses: action.payload };
      break;
    case PATCH_SCHOOL_CLASS:
      output = { ...state, patchSchoolClass: action.payload };
      break;
    case DELETE_SCHOOL_CLASS:
      output = { ...state, deleteSchoolClass: action.payload };
      break;
    case POST_SCHOOL_CLASS:
      output = { ...state, postSchoolClass: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default schoolClassReducer;
