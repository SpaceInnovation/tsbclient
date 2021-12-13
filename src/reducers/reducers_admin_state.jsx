import {
  FETCH_ALL_STATES,
  DELETE_STATE,
  POST_STATE,
  PATCH_STATE,
} from "../actions/types";

const INITIALSTATE = {};

const stateReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_STATES:
      output = { ...state, fetchStates: action.payload };
      break;
    case PATCH_STATE:
      output = { ...state, patchState: action.payload };
      break;
    case DELETE_STATE:
      output = { ...state, deleteState: action.payload };
      break;
    case POST_STATE:
      output = { ...state, postState: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default stateReducer;
