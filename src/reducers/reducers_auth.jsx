import { ADMIN_SIGNUP, ADMIN_SIGNIN } from "../actions/types";

const initialState = {};

const adminAuthReducer = (state = initialState, action) => {
  let output;
  switch (action.type) {
    case ADMIN_SIGNUP:
      output = { ...state, signup: action.payload };
      break;
    case ADMIN_SIGNIN:
      output = { ...state, signin: action.payload };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default adminAuthReducer;
