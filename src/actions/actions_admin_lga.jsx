import { FETCH_ALL_LGAS, DELETE_LGA, PATCH_LGA } from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadLgas = (result) => {
  return {
    type: FETCH_ALL_LGAS,
    payload: result,
  };
};

export const fetchLgas = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/lga/all/?key=${API_KEY}`, {
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
        console.log("json", json);
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadLgas(json));
      })
      .catch((error) =>
        dispatch(
          loadLgas({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeleteLga = (result) => {
  return {
    type: DELETE_LGA,
    payload: result,
  };
};

export const deleteLga = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/lga/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeleteLga(json));
      })
      .catch((error) =>
        dispatch(
          loadDeleteLga({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchLga = (result) => {
  return {
    type: PATCH_LGA,
    payload: result,
  };
};

export const patchLga = (data, id) => {
  let lgaData;
  if (data.schools !== "") {
    lgaData = {
      teachers: data.teachers,
      fieldID: data.schools,
    };
  }
  if (data.teachers !== "") {
    lgaData = {
      schools: data.schools,
      fieldID: data.teachers,
    };
  }
  console.log("lgaData", lgaData);

  return (dispatch) =>
    fetch(`${BACKEND_URL}/lga/remove-Item/${id}/?key=${API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(lgaData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPatchLga(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchLga({
            success: false,
            message: error.message,
          })
        )
      );
};
