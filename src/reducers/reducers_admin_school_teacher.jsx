import {
  FETCH_SCHOOL_TEACHERS,
  DELETE_SCHOOL_TEACHER,
  POST_SCHOOL_TEACHER,
  PATCH_SCHOOL_TEACHER,
  FETCH_ALL_SCHOOL_TEACHERS,
} from "../actions/types";

const INITIALSTATE = {};

const schoolTeacherReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_SCHOOL_TEACHERS:
      output = { ...state, fetchSchoolTeachers: action.payload };
      break;
    case PATCH_SCHOOL_TEACHER:
      output = { ...state, patchSchoolTeacher: action.payload };
      break;
    case DELETE_SCHOOL_TEACHER:
      output = { ...state, deleteSchoolTeacher: action.payload };
      break;
    case POST_SCHOOL_TEACHER:
      output = { ...state, postSchoolTeacher: action.payload };
      break;

    case FETCH_ALL_SCHOOL_TEACHERS:
      output = { ...state, fetchAllSchoolTeachers: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default schoolTeacherReducer;
