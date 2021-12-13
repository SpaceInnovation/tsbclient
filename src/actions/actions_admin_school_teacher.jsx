import {
  FETCH_SCHOOL_TEACHERS,
  DELETE_SCHOOL_TEACHER,
  POST_SCHOOL_TEACHER,
  PATCH_SCHOOL_TEACHER,
  FETCH_ALL_SCHOOL_TEACHERS,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostSchoolTeacher = (result) => {
  return {
    type: POST_SCHOOL_TEACHER,
    payload: result,
  };
};

export const postSchoolTeacher = (data, id) => {
  const subjectData = {
    subject: data.subject,
    school: id,
  };
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolteachers/create/?key=${API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(subjectData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPostSchoolTeacher(json));
      })
      .catch((error) =>
        dispatch(
          loadPostSchoolTeacher({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadSchoolTeachers = (result) => {
  return {
    type: FETCH_SCHOOL_TEACHERS,
    payload: result,
  };
};

export const fetchSchoolTeachers = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolteachers/all/?key=${API_KEY}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadSchoolTeachers(json));
      })
      .catch((error) =>
        dispatch(
          loadSchoolTeachers({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteSchoolTeacher = (result) => {
  return {
    type: DELETE_SCHOOL_TEACHER,
    payload: result,
  };
};

export const deleteSchoolTeacher = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolteachers/delete/${id}/?key=${API_KEY}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadDeleteSchoolTeacher(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteSchoolTeacher({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchSchoolTeacher = (result) => {
  return {
    type: PATCH_SCHOOL_TEACHER,
    payload: result,
  };
};

export const patchSchoolTeacher = (data, schoolId, id) => {
  const userData = {
    school: schoolId,
    subject: data.subject,
  };
  console.log("userData", userData);
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolteachers/edit/${id}/?key=${API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPatchSchoolTeacher(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchSchoolTeacher({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadAllSchoolTeachers = (result) => {
  return {
    type: FETCH_ALL_SCHOOL_TEACHERS,
    payload: result,
  };
};

export const fetchAllSchoolTeachers = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolteachers/school/${id}/?key=${API_KEY}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadAllSchoolTeachers(json));
      })
      .catch((error) =>
        dispatch(
          loadAllSchoolTeachers({
            success: false,
            message: error.message,
          })
        )
      );
};
