import {
  FETCH_ALL_CLASSES,
  DELETE_CLASS,
  POST_CLASS,
  PATCH_CLASS,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostClass = (result) => {
  return {
    type: POST_CLASS,
    payload: result,
  };
};

export const postClass = (data) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/class/create/?key=${API_KEY}`, {
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
        console.log(json);
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPostClass(json));
      })
      .catch((error) =>
        dispatch(
          loadPostClass({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadClass = (result) => {
  return {
    type: FETCH_ALL_CLASSES,
    payload: result,
  };
};

export const fetchClasses = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/class/all/?key=${API_KEY}`, {
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
        return dispatch(loadClass(json));
      })
      .catch((error) =>
        dispatch(
          loadClass({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteClass = (result) => {
  return {
    type: DELETE_CLASS,
    payload: result,
  };
};

export const deleteClass = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/class/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteClass(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteClass({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchClass = (result) => {
  return {
    type: PATCH_CLASS,
    payload: result,
  };
};

export const patchClass = (data, id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/class/edit/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchClass(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchClass({
            success: false,
            message: error.message,
          })
        )
      );
};
