import {
  FETCH_ALL_SUBJECTS,
  DELETE_SUBJECT,
  POST_SUBJECT,
  PATCH_SUBJECT,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostSubject = (result) => {
  return {
    type: POST_SUBJECT,
    payload: result,
  };
};

export const postSubject = (data) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/subject/create/?key=${API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPostSubject(json));
      })
      .catch((error) =>
        dispatch(
          loadPostSubject({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadSubjects = (result) => {
  return {
    type: FETCH_ALL_SUBJECTS,
    payload: result,
  };
};

export const fetchSubjects = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/subject/all/?key=${API_KEY}`, {
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
        return dispatch(loadSubjects(json));
      })
      .catch((error) =>
        dispatch(
          loadSubjects({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteSubject = (result) => {
  return {
    type: DELETE_SUBJECT,
    payload: result,
  };
};

export const deleteSubject = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/subject/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteSubject(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteSubject({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchSubject = (result) => {
  return {
    type: PATCH_SUBJECT,
    payload: result,
  };
};

export const patchSubject = (data, id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/subject/edit/${id}/?key=${API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPatchSubject(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchSubject({
            success: false,
            message: error.message,
          })
        )
      );
};
