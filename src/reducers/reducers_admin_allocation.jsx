import {
  FETCH_ALL_ALLOCATIONS,
  POST_ALLOCATION,
  DELETE_ALLOCATION,
  PATCH_ALLOCATION,
} from "../actions/types";

const INITIALSTATE = {};

const allocationReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_ALLOCATIONS:
      output = { ...state, fetchAllocations: action.payload };
      break;
    case POST_ALLOCATION:
      output = { ...state, postAllocation: action.payload };
      break;

    case PATCH_ALLOCATION:
      output = { ...state, patchAllocation: action.payload };
      break;
    case DELETE_ALLOCATION:
      output = { ...state, deleteAllocation: action.payload };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default allocationReducer;
