import {
  FETCH_ALL_SUBJECTS,
  POST_SUBJECT,
  DELETE_SUBJECT,
  PATCH_SUBJECT,
} from "../actions/types";

const INITIALSTATE = {};

const subjectReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_SUBJECTS:
      output = { ...state, fetchSubjects: action.payload };
      break;
    case PATCH_SUBJECT:
      output = { ...state, patchSubject: action.payload };
      break;
    case DELETE_SUBJECT:
      output = { ...state, deleteSubject: action.payload };
      break;
    case POST_SUBJECT:
      output = { ...state, postSubject: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default subjectReducer;
