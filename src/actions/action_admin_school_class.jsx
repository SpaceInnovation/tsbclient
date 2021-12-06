import {
  FETCH_SCHOOL_CLASSES,
  DELETE_SCHOOL_CLASS,
  POST_SCHOOL_CLASS,
  PATCH_SCHOOL_CLASS,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

console.log(BACKEND_URL);
export const loadPostSchoolClass = (result) => {
  return {
    type: POST_SCHOOL_CLASS,
    payload: result,
  };
};

export const postSchoolClass = (data, id) => {
  const classData = {
    classes: data.classes,
    school: id,
  };
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolClasses/create/?key=${API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(classData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPostSchoolClass(json));
      })
      .catch((error) =>
        dispatch(
          loadPostSchoolClass({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadSchoolClass = (result) => {
  return {
    type: FETCH_SCHOOL_CLASSES,
    payload: result,
  };
};

export const fetchSchoolClasses = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolClasses/all/?key=${API_KEY}`, {
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
        return dispatch(loadSchoolClass(json));
      })
      .catch((error) =>
        dispatch(
          loadSchoolClass({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteSchoolClass = (result) => {
  return {
    type: DELETE_SCHOOL_CLASS,
    payload: result,
  };
};

export const deleteSchoolClass = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolClasses/delete/${id}/?key=${API_KEY}`, {
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
        console.log("json", json);
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadDeleteSchoolClass(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteSchoolClass({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchSchoolClass = (result) => {
  return {
    type: PATCH_SCHOOL_CLASS,
    payload: result,
  };
};

export const patchSchoolClass = (data, id) => {
  console.log("patchSchoolClass", data, id);
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolClasses/edit/${id}/?key=${API_KEY}`, {
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
        console.log("json", json);
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPatchSchoolClass(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchSchoolClass({
            success: false,
            message: error.message,
          })
        )
      );
};
