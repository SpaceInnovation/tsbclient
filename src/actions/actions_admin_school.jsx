import {
  FETCH_ALL_SCHOOLS,
  DELETE_SCHOOL,
  POST_SCHOOL,
  PATCH_SCHOOL,
  FETCH_ALL_SCHOOL_CLASSES,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostSchool = (result) => {
  return {
    type: POST_SCHOOL,
    payload: result,
  };
};

export const postSchool = (data) => {
  const userData = {
    name: data.name,
    lga: data.lga,
  };

  return (dispatch) =>
    fetch(`${BACKEND_URL}/school/create/?key=${API_KEY}`, {
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
        console.log("json", json);
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPostSchool(json));
      })
      .catch((error) =>
        dispatch(
          loadPostSchool({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadSchool = (result) => {
  return {
    type: FETCH_ALL_SCHOOLS,
    payload: result,
  };
};

export const fetchSchools = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/school/all/?key=${API_KEY}`, {
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
        return dispatch(loadSchool(json));
      })
      .catch((error) =>
        dispatch(
          loadSchool({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadSchoolClass = (result) => {
  return {
    type: FETCH_ALL_SCHOOL_CLASSES,
    payload: result,
  };
};

export const fetchAllSchoolClasses = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/schoolClasses/school/${id}/?key=${API_KEY}`, {
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

export const loadDeleteSchool = (result) => {
  return {
    type: DELETE_SCHOOL,
    payload: result,
  };
};

export const deleteSchool = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/school/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteSchool(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteSchool({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchSchool = (result) => {
  return {
    type: PATCH_SCHOOL,
    payload: result,
  };
};

export const patchSchool = (data, id) => {
  const userData = {
    name: data.name,
    classID: data.classes,
    subject: { name: data.subject },
    teacher: { name: data.teacher },
  };
  return (dispatch) =>
    fetch(`${BACKEND_URL}/school/edit/${id}/?key=${API_KEY}`, {
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
        console.log("json", json);
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPatchSchool(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchSchool({
            success: false,
            message: error.message,
          })
        )
      );
};
