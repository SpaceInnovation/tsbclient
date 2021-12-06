import {
  FETCH_ALL_ADMIN,
  DELETE_ADMIN,
  PATCH_ADMIN,
  FETCH_ONE_ADMIN,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadOneAdmins = (result) => {
  return {
    type: FETCH_ONE_ADMIN,
    payload: result,
  };
};

export const fetchOneAdmin = (adminId) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/admin/details/${adminId}/?key=${API_KEY}`, {
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
        return dispatch(loadOneAdmins(json));
      })
      .catch((error) =>
        dispatch(
          loadOneAdmins({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadAdmins = (result) => {
  return {
    type: FETCH_ALL_ADMIN,
    payload: result,
  };
};

export const fetchAdmin = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/admin/all/?key=${API_KEY}`, {
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
        return dispatch(loadAdmins(json));
      })
      .catch((error) =>
        dispatch(
          loadAdmins({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteAdmin = (result) => {
  return {
    type: DELETE_ADMIN,
    payload: result,
  };
};

export const deleteAdmin = (adminId) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/admin/delete/${adminId}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteAdmin(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteAdmin({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchAdmin = (result) => {
  return {
    type: PATCH_ADMIN,
    payload: result,
  };
};

export const patchAdmin = (data, adminId) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/admin/edit/${adminId}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchAdmin(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchAdmin({
            success: false,
            message: error.message,
          })
        )
      );
};
