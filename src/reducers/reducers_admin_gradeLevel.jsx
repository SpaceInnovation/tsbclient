import {
  FETCH_ALL_GRADELEVEL,
  POST_GRADELEVEL,
  DELETE_GRADELEVEL,
  PATCH_GRADELEVEL,
} from "../actions/types";

const INITIALSTATE = {};

const gradeLevelReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_GRADELEVEL:
      output = { ...state, fetchGradeLevels: action.payload };
      break;
    case PATCH_GRADELEVEL:
      output = { ...state, patchGradeLevel: action.payload };
      break;
    case DELETE_GRADELEVEL:
      output = { ...state, deleteGradeLevel: action.payload };
      break;
    case POST_GRADELEVEL:
      output = { ...state, postGradeLevel: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default gradeLevelReducer;
