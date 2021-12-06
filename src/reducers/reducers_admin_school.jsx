import {
  FETCH_ALL_SCHOOLS,
  POST_SCHOOL,
  DELETE_SCHOOL,
  PATCH_SCHOOL,
  POST_SCHOOL_CLASS,
  FETCH_ALL_SCHOOL_CLASSES,
} from "../actions/types";

const INITIALSTATE = {};

const schoolReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_SCHOOLS:
      output = { ...state, fetchSchools: action.payload };
      break;
    case PATCH_SCHOOL:
      output = { ...state, patchSchool: action.payload };
      break;
    case DELETE_SCHOOL:
      output = { ...state, deleteSchool: action.payload };
      break;
    case POST_SCHOOL:
      output = { ...state, postSchool: action.payload };
      break;

    case POST_SCHOOL_CLASS:
      output = { ...state, postSchoolClass: action.payload };
      break;
    case FETCH_ALL_SCHOOL_CLASSES:
      output = { ...state, fetchAllSchoolClasses: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default schoolReducer;
