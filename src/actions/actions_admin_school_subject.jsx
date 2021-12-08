import {
  FETCH_SCHOOL_SUBJECTS,
  DELETE_SCHOOL_SUBJECT,
  POST_SCHOOL_SUBJECT,
  PATCH_SCHOOL_SUBJECT,
  FETCH_ALL_SCHOOL_SUBJECTS,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostSchoolSubject = (result) => {
  return {
    type: POST_SCHOOL_SUBJECT,
    payload: result,
  };
};

export const postSchoolSubject = (data, id) => {
  const subjectData = {
    subject: data.subject,
    school: id,
  };
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolsubjects/create/?key=${API_KEY}`, {
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
        return dispatch(loadPostSchoolSubject(json));
      })
      .catch((error) =>
        dispatch(
          loadPostSchoolSubject({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadSchoolSubjects = (result) => {
  return {
    type: FETCH_SCHOOL_SUBJECTS,
    payload: result,
  };
};

export const fetchSchoolSubjects = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolsubjects/all/?key=${API_KEY}`, {
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
        return dispatch(loadSchoolSubjects(json));
      })
      .catch((error) =>
        dispatch(
          loadSchoolSubjects({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteSchoolSubject = (result) => {
  return {
    type: DELETE_SCHOOL_SUBJECT,
    payload: result,
  };
};

export const deleteSchoolSubject = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolsubjects/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteSchoolSubject(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteSchoolSubject({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchSchoolSubject = (result) => {
  return {
    type: PATCH_SCHOOL_SUBJECT,
    payload: result,
  };
};

export const patchSchoolSubject = (data, schoolId, id) => {
  const userData = {
    school: schoolId,
    subject: data.subject,
  };
  console.log("userData", userData);
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolsubjects/edit/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchSchoolSubject(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchSchoolSubject({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadAllSchoolSubjects = (result) => {
  return {
    type: FETCH_ALL_SCHOOL_SUBJECTS,
    payload: result,
  };
};

export const fetchAllSchoolSubjects = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/SchoolSubjects/school/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadAllSchoolSubjects(json));
      })
      .catch((error) =>
        dispatch(
          loadAllSchoolSubjects({
            success: false,
            message: error.message,
          })
        )
      );
};
