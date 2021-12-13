import {
  FETCH_ALL_TEACHERS,
  DELETE_TEACHER,
  POST_TEACHER,
  PATCH_TEACHER,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostTeacher = (result) => {
  return {
    type: POST_TEACHER,
    payload: result,
  };
};
export const postTeacher = (data) => {
  const formData = new FormData();
  for (let key in data) {
    if (typeof data[key] === "object") {
      for (let subKey in data[key]) {
        formData.append(`${key}[${subKey}]`, data[key][subKey]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  formData.append("imageURL", data.imageURL);
  return (dispatch) =>
    fetch(`${BACKEND_URL}/teacher/create/?key=${API_KEY}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPostTeacher(json));
      })
      .catch((error) =>
        dispatch(
          loadPostTeacher({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadTeachers = (result) => {
  return {
    type: FETCH_ALL_TEACHERS,
    payload: result,
  };
};

export const fetchTeachers = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/teacher/all/?key=${API_KEY}`, {
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
        return dispatch(loadTeachers(json));
      })
      .catch((error) => {
        dispatch(
          loadTeachers({
            success: false,
            message: error.message,
          })
        );
      });
};

export const loadDeleteTeacher = (result) => {
  return {
    type: DELETE_TEACHER,
    payload: result,
  };
};

export const deleteTeacher = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/teacher/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteTeacher(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteTeacher({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchTeacher = (result) => {
  return {
    type: PATCH_TEACHER,
    payload: result,
  };
};

export const patchTeacher = (data, id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/teacher/edit/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchTeacher(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchTeacher({
            success: false,
            message: error.message,
          })
        )
      );
};
