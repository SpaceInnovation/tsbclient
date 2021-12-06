import {
  FETCH_ALL_ALLOCATIONS,
  POST_ALLOCATION,
  DELETE_ALLOCATION,
  PATCH_ALLOCATION,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadPostAllocation = (result) => {
  return {
    type: POST_ALLOCATION,
    payload: result,
  };
};

export const postAllocation = (data, id) => {
  const userData = {
    schoolID: data.school,
    subject: { name: data.subject },
    teacher: { name: data.teacher },
  };
  console.log("userdata", userData);

  let json;
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/allocation/allocate/${id}?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(getFromLocalStorage("tsb-login:admin")).token
            }`,
          },
          body: JSON.stringify(userData),
        }
      );
      json = await response.json();
      if (json.error) {
        console.log("json", json);
        throw json.error;
      }
      return dispatch(loadPostAllocation(json.message));
    } catch (error) {
      return dispatch(
        loadPostAllocation({
          success: false,
          message: json.message,
        })
      );
    }
  };
};

export const loadAllocation = (result) => {
  return {
    type: FETCH_ALL_ALLOCATIONS,
    payload: result,
  };
};

export const fetchAllocations = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/allocation/all/?key=${API_KEY}`, {
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
        return dispatch(loadAllocation(json));
      })
      .catch((error) =>
        dispatch(
          loadAllocation({
            success: false,
            message: error.message,
          })
        )
      );
};
export const loadPatchAllocation = (result) => {
  return {
    type: PATCH_ALLOCATION,
    payload: result,
  };
};

export const patchAllocation = (data, id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/allocation/edit/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchAllocation(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchAllocation({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteAllocation = (result) => {
  return {
    type: DELETE_ALLOCATION,
    payload: result,
  };
};

export const deleteAllocation = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/allocation/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteAllocation(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteAllocation({
            success: false,
            message: error.message,
          })
        )
      );
};
