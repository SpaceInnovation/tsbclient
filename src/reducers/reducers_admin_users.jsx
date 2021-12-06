import {
  FETCH_ALL_ADMIN,
  DELETE_ADMIN,
  PATCH_ADMIN,
  FETCH_ONE_ADMIN,
} from "../actions/types";

const INITIALSTATE = {};

const adminUserReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_ADMIN:
      output = { ...state, fetchAdmin: action.payload };
      break;
    case PATCH_ADMIN:
      output = { ...state, patchAdmin: action.payload };
      break;
    case FETCH_ONE_ADMIN:
      output = { ...state, fetchOneAdmin: action.payload };
      break;
    case DELETE_ADMIN:
      output = { ...state, deleteAdmin: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default adminUserReducer;
