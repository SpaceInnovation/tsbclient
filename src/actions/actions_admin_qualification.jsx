import {
  FETCH_ALL_QUALIFICATION,
  DELETE_QUALIFICATION,
  POST_QUALIFICATION,
  PATCH_QUALIFICATION,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostQualification = (result) => {
  return {
    type: POST_QUALIFICATION,
    payload: result,
  };
};

export const postQualification = (data) => {
  let json;
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/qualification/create/?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(getFromLocalStorage("tsb-login:admin")).token
            }`,
          },
          body: JSON.stringify(data),
        }
      );

      json = await response.json();
      console.log("json", json);
      if (json.error) {
        throw json.error;
      }
      return dispatch(loadPostQualification(json));
    } catch (error) {
      console.log("err", error);
      dispatch(
        loadPostQualification({
          success: false,
          message: json.message,
        })
      );
    }

    // .then((response) => response.json())
    // .then((json) => {
    //   console.log("json", json);
    //   if (json.error) {
    //     throw json.error;
    //   }
    //   return dispatch(loadPostQualification(json));
    // })
    // .catch((error) =>
    //   dispatch(
    //     loadPostQualification({
    //       success: false,
    //       message: json.message,
    //     })
    //   )
    // );
  };
};

export const loadQualifications = (result) => {
  return {
    type: FETCH_ALL_QUALIFICATION,
    payload: result,
  };
};

export const fetchQualification = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/qualification/all/?key=${API_KEY}`, {
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
        return dispatch(loadQualifications(json));
      })
      .catch((error) =>
        dispatch(
          loadQualifications({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteQualification = (result) => {
  return {
    type: DELETE_QUALIFICATION,
    payload: result,
  };
};

export const deleteQualification = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/qualification/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteQualification(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteQualification({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchQualification = (result) => {
  return {
    type: PATCH_QUALIFICATION,
    payload: result,
  };
};

export const patchQualification = (data, id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/qualification/edit/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchQualification(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchQualification({
            success: false,
            message: error.message,
          })
        )
      );
};
