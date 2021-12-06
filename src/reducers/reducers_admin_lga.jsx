import { FETCH_ALL_LGAS, DELETE_LGA, PATCH_LGA } from "../actions/types";

const INITIALSTATE = {};

const LgaReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_LGAS:
      output = { ...state, fetchLgas: action.payload };
      break;
    case PATCH_LGA:
      output = { ...state, patchLga: action.payload };
      break;
    case DELETE_LGA:
      output = { ...state, deleteLga: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default LgaReducer;
