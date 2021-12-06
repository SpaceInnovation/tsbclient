import {
  FETCH_ALL_TEACHERS,
  DELETE_TEACHER,
  POST_TEACHER,
  PATCH_TEACHER,
} from "./types";
import { BACKEND_URL, API_KEY } from "./api";
import { getFromLocalStorage } from "../helpers/browserStorage";
import axios from "axios";

export const loadPostTeacher = (result) => {
  return {
    type: POST_TEACHER,
    payload: result,
  };
};

export const postTeacher = (data) => {
  console.log("data", data);
  return async (dispatch) => {
    try {
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
      // formData.append("LGAOrigin", data.LGAOrigin);
      // formData.append("NIN", data.NIN);
      // formData.append("address", data.address);
      // formData.append("appointmentDate", data.appointmentDate);
      // formData.append("disability", data.disability);
      // formData.append("discipline", data.discipline);
      // formData.append("dob", data.dob);
      // formData.append("email", data.email);
      // formData.append("firstName", data.firstName);
      // formData.append("gender", data.gender);
      // formData.append("gradeLevel", data.gradeLevel);
      // formData.append("maritalStatus", data.maritalStatus);
      // formData.append("phone", data.phone);
      // formData.append("qualification", data.qualification);
      // formData.append("spouse", data.spouse);
      // formData.append("staffID", data.staffID);
      // formData.append("stateOrigin", data.stateOrigin);
      // formData.append("subject", data.subject);
      // formData.append("subject", data.subject);
      // formData.append("surname", data.surname);
      // formData.append("title", data.title);
      // formData.append("nationality", data.nationality);
      // formData.append("nextOfKin", data.nextOfKin);

      const response = await axios.post(
        `${BACKEND_URL}/teacher/create/?key=${API_KEY}`,
        formData,
        {
          Accept: "image/*",
          headers: {
            "Content-Type": `multipart/form-data`,
            authorization: `Bearer ${
              JSON.parse(getFromLocalStorage("tsb-login:admin")).token
            }`,
          },
        }
      );
      const json = await response.data;
      if (json.error) {
        throw json.error;
      }
      return dispatch(loadPostTeacher(json));
    } catch (error) {
      return dispatch(
        loadPostTeacher({
          success: false,
          message: error.message,
        })
      );
    }
  };
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
