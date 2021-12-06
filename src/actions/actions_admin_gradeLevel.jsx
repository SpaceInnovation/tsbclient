import {
  FETCH_ALL_GRADELEVEL,
  DELETE_GRADELEVEL,
  POST_GRADELEVEL,
  PATCH_GRADELEVEL,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostGradeLevel = (result) => {
  return {
    type: POST_GRADELEVEL,
    payload: result,
  };
};

export const postGradeLevel = (data) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/gradelevel/create/?key=${API_KEY}`, {
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
        return dispatch(loadPostGradeLevel(json));
      })
      .catch((error) =>
        dispatch(
          loadPostGradeLevel({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadGradeLevels = (result) => {
  return {
    type: FETCH_ALL_GRADELEVEL,
    payload: result,
  };
};

export const fetchGradeLevel = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/gradelevel/all/?key=${API_KEY}`, {
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
        return dispatch(loadGradeLevels(json));
      })
      .catch((error) =>
        dispatch(
          loadGradeLevels({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteGradeLevel = (result) => {
  return {
    type: DELETE_GRADELEVEL,
    payload: result,
  };
};

export const deleteGradeLevel = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/gradelevel/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteGradeLevel(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteGradeLevel({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchGradeLevel = (result) => {
  return {
    type: PATCH_GRADELEVEL,
    payload: result,
  };
};

export const patchGradeLevel = (data, id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/gradelevel/edit/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchGradeLevel(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchGradeLevel({
            success: false,
            message: error.message,
          })
        )
      );
};
