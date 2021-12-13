import {
  FETCH_ALL_LGASORIGIN,
  DELETE_LGAORIGIN,
  POST_LGAORIGIN,
  PATCH_LGAORIGIN,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostLgaOrign = (result) => {
  return {
    type: POST_LGAORIGIN,
    payload: result,
  };
};

export const postLgaOrigin = (data) => {
  console.log("data", data);
  return (dispatch) =>
    fetch(`${BACKEND_URL}/lgaOrigin/create/?key=${API_KEY}`, {
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
        return dispatch(loadPostLgaOrign(json));
      })
      .catch((error) =>
        dispatch(
          loadPostLgaOrign({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadLgasOrigin = (result) => {
  return {
    type: FETCH_ALL_LGASORIGIN,
    payload: result,
  };
};

export const fetchLgasOrigin = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/lgaOrigin/index/?key=${API_KEY}`, {
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
        return dispatch(loadLgasOrigin(json));
      })
      .catch((error) =>
        dispatch(
          loadLgasOrigin({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteLgaOrigin = (result) => {
  return {
    type: DELETE_LGAORIGIN,
    payload: result,
  };
};

export const deleteLgaOrigin = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/lgaOrigin/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteLgaOrigin(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteLgaOrigin({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchLgaOrigin = (result) => {
  return {
    type: PATCH_LGAORIGIN,
    payload: result,
  };
};

export const patchLgaOrigin = (data, id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/lgaOrigin/edit/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchLgaOrigin(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchLgaOrigin({
            success: false,
            message: error.message,
          })
        )
      );
};
