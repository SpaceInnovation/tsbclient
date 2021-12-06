import {
  FETCH_ALL_LGASORIGIN,
  POST_LGAORIGIN,
  DELETE_LGAORIGIN,
  PATCH_LGAORIGIN,
} from "../actions/types";

const INITIALSTATE = {};

const LgaOriginReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_LGASORIGIN:
      output = { ...state, fetchLgasOrigin: action.payload };
      break;
    case PATCH_LGAORIGIN:
      output = { ...state, patchLgaOrigin: action.payload };
      break;
    case DELETE_LGAORIGIN:
      output = { ...state, deleteLgaOrigin: action.payload };
      break;
    case POST_LGAORIGIN:
      output = { ...state, postLgaOrigin: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default LgaOriginReducer;
