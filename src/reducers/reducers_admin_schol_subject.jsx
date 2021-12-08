import {
  FETCH_SCHOOL_SUBJECTS,
  DELETE_SCHOOL_SUBJECT,
  POST_SCHOOL_SUBJECT,
  PATCH_SCHOOL_SUBJECT,
  FETCH_ALL_SCHOOL_SUBJECTS,
} from "../actions/types";

const INITIALSTATE = {};

const schoolSubjectReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_SCHOOL_SUBJECTS:
      output = { ...state, fetchSchoolSubjects: action.payload };
      break;
    case PATCH_SCHOOL_SUBJECT:
      output = { ...state, patchSchoolSubject: action.payload };
      break;
    case DELETE_SCHOOL_SUBJECT:
      output = { ...state, deleteSchoolSubject: action.payload };
      break;
    case POST_SCHOOL_SUBJECT:
      output = { ...state, postSchoolSubject: action.payload };
      break;

    case FETCH_ALL_SCHOOL_SUBJECTS:
      output = { ...state, fetchAllSchoolSubjects: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default schoolSubjectReducer;
