import {
  FETCH_ALL_STATES,
  DELETE_STATE,
  POST_STATE,
  PATCH_STATE,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostState = (result) => {
  return {
    type: POST_STATE,
    payload: result,
  };
};

export const postState = (data) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/states/create/?key=${API_KEY}`, {
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
        return dispatch(loadPostState(json.message));
      })
      .catch((error) =>
        dispatch(
          loadPostState({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadStates = (result) => {
  return {
    type: FETCH_ALL_STATES,
    payload: result,
  };
};

export const fetchStates = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/states/index/?key=${API_KEY}`, {
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
        return dispatch(loadStates(json));
      })
      .catch((error) =>
        dispatch(
          loadStates({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteState = (result) => {
  return {
    type: DELETE_STATE,
    payload: result,
  };
};

export const deleteState = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/states/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteState(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteState({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchLState = (result) => {
  return {
    type: PATCH_STATE,
    payload: result,
  };
};

export const patchState = (data, id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/states/edit/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchLState(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchLState({
            success: false,
            message: error.message,
          })
        )
      );
};
