import {
  FETCH_ALL_QUALIFICATION,
  POST_QUALIFICATION,
  DELETE_QUALIFICATION,
  PATCH_QUALIFICATION,
} from "../actions/types";

const INITIALSTATE = {};

const qualificationReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_QUALIFICATION:
      output = { ...state, fetchQualifications: action.payload };
      break;
    case PATCH_QUALIFICATION:
      output = { ...state, patchQualification: action.payload };
      break;
    case DELETE_QUALIFICATION:
      output = { ...state, deleteQualification: action.payload };
      break;
    case POST_QUALIFICATION:
      output = { ...state, postQualification: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default qualificationReducer;
