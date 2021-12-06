import { combineReducers } from "redux";
import adminAuthReducer from "./reducers_auth";
import adminUsersReducer from "./reducers_admin_users";
import qualificationReducer from "./reducers_admin_qualification";
import gradeLevelReducer from "./reducers_admin_gradeLevel";
import teacherReducer from "./reducers_admin_teacher";
import subjectReducer from "./reducer_admin_subject";
import lgaOriginReducer from "./reducers_admin_lgaOrigin";
import schoolReducer from "./reducers_admin_school";
import classReducer from "./reducers_admin_class";
import schoolClassReducer from "./reducer_admin_school_class";
import allocationReducer from "../reducers/reducers_admin_allocation";
import lgaReducer from "../reducers/reducers_admin_lga";

export default combineReducers({
  adminAuth: adminAuthReducer,
  adminUsers: adminUsersReducer,
  qualification: qualificationReducer,
  gradeLevel: gradeLevelReducer,
  teacher: teacherReducer,
  subject: subjectReducer,
  lga: lgaOriginReducer,
  school: schoolReducer,
  schoolClass: schoolClassReducer,
  classReducer,
  allocation: allocationReducer,
  lgas: lgaReducer,
});
