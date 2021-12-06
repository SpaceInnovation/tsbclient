import {
  FETCH_ALL_TEACHERS,
  POST_TEACHER,
  DELETE_TEACHER,
  PATCH_TEACHER,
} from "../actions/types";

const INITIALSTATE = {};

const TeacherReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_TEACHERS:
      output = { ...state, fetchTeachers: action.payload };
      break;
    case PATCH_TEACHER:
      output = { ...state, patchTeacher: action.payload };
      break;
    case DELETE_TEACHER:
      output = { ...state, deleteTeacher: action.payload };
      break;
    case POST_TEACHER:
      output = { ...state, postTeacher: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default TeacherReducer;
