import {
  FETCH_ALL_POSTINGS,
  DELETE_POSTING,
  PATCH_POSTING,
  POST_POSTING,
  POSTINGS_POSTING,
  FETCH_SCHOOL_BY_LGA_ID,
  POSTINGS_EMPLOYED,
  POST_TRANSFER,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";

export const loadFetchPostingEmployed = (result) => {
  return {
    type: POSTINGS_EMPLOYED,
    payload: result,
  };
};

export const fetchPostingsEmployed = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/postings/employed/?key=${API_KEY}`, {
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
        return dispatch(loadFetchPostingEmployed(json));
      })
      .catch((error) =>
        dispatch(
          loadFetchPostingEmployed({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPosting = (result) => {
  return {
    type: POST_POSTING,
    payload: result,
  };
};

export const postPosting = (data, schFromID, teacherID) => {
  const postingData = {
    schoolFrom: schFromID,
    schoolTo: data.school,
    teacher: teacherID,
  };
  console.log(postingData);

  return (dispatch) =>
    fetch(`${BACKEND_URL}/postings/create/?key=${API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(postingData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPosting(json.message));
      })
      .catch((error) =>
        dispatch(
          loadPosting({
            success: false,
            message: error.message,
          })
        )
      );
};
export const loadPostTransfer = (result) => {
  return {
    type: POST_TRANSFER,
    payload: result,
  };
};

export const postTransfer = (data, schFromID, teacherID) => {
  const postingData = {
    schoolFrom: schFromID,
    schoolTo: data.school,
    teacher: teacherID,
  };
  console.log(postingData);

  return (dispatch) =>
    fetch(`${BACKEND_URL}/postings/create/?key=${API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(getFromLocalStorage("tsb-login:admin")).token
        }`,
      },
      body: JSON.stringify(postingData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        return dispatch(loadPostTransfer(json.message));
      })
      .catch((error) =>
        dispatch(
          loadPostTransfer({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadAllPosting = (result) => {
  return {
    type: FETCH_ALL_POSTINGS,
    payload: result,
  };
};

export const fetchAllPostings = () => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/postings/all/?key=${API_KEY}`, {
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
        return dispatch(loadAllPosting(json));
      })
      .catch((error) =>
        dispatch(
          loadAllPosting({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadDeletePosting = (result) => {
  return {
    type: DELETE_POSTING,
    payload: result,
  };
};

export const deletePosting = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/postings/delete/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadDeletePosting(json));
      })
      .catch((error) =>
        dispatch(
          loadDeletePosting({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPatchLPosting = (result) => {
  return {
    type: PATCH_POSTING,
    payload: result,
  };
};

export const patchPosting = (data, id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/postings/edit/${id}/?key=${API_KEY}`, {
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
        return dispatch(loadPatchLPosting(json));
      })
      .catch((error) =>
        dispatch(
          loadPatchLPosting({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadPostingsPosting = (result) => {
  return {
    type: POSTINGS_POSTING,
    payload: result,
  };
};

export const postingsPosting = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/postings/posting/${id}?key=${API_KEY}`, {
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
        return dispatch(loadPostingsPosting(json));
      })
      .catch((error) =>
        dispatch(
          loadPostingsPosting({
            success: false,
            message: error.message,
          })
        )
      );
};

export const loadFetchSchoolsByLgaId = (result) => {
  return {
    type: FETCH_SCHOOL_BY_LGA_ID,
    payload: result,
  };
};

export const fetchSchoolByLgaID = (id) => {
  return (dispatch) =>
    fetch(`${BACKEND_URL}/postings/fetchSchoolsBylgaid/${id}?key=${API_KEY}`, {
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
        return dispatch(loadFetchSchoolsByLgaId(json));
      })
      .catch((error) =>
        dispatch(
          loadFetchSchoolsByLgaId({
            success: false,
            message: error.message,
          })
        )
      );
};
