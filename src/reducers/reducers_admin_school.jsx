import {
  FETCH_ALL_SCHOOLS,
  POST_SCHOOL,
  DELETE_SCHOOL,
  PATCH_SCHOOL,
  FETCH_SCHOOL_BY_ID,
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
    case FETCH_SCHOOL_BY_ID:
      output = { ...state, fetchSchoolById: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default schoolReducer;
