import { ADMIN_SIGNIN, ADMIN_SIGNUP } from "./types";
import { BACKEND_URL, API_KEY } from "./api";

import {
  setUserAccount,
  unsetUserAccount,
} from "../components/Auth/AccessControl";

console.log(BACKEND_URL);
export const loadAdminSignup = (result) => {
  return {
    type: ADMIN_SIGNUP,
    payload: result,
  };
};

export const signup = (data, user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/${user}/signup/?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      if (json.error) throw json.error;
      return dispatch(loadAdminSignup(json));
    } catch (error) {
      return dispatch(
        loadAdminSignup({
          success: false,
          message: error.message,
        })
      );
    }
  };
};

export const loadAdminLogin = (result) => {
  return {
    type: ADMIN_SIGNIN,
    payload: result,
  };
};

export const login = (data, user) => {
  let json;
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/${user}/signin/?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      json = await response.json();
      console.log("json", json);
      const { token } = json;
      const { _id } = json.user;
      setUserAccount({ user, _id, token });
      if (json.error) {
        throw json.error;
      }
      return dispatch(loadAdminLogin(json));
    } catch (err) {
      console.log(err);
      return dispatch(
        loadAdminLogin({
          success: false,
          message: json.message,
        })
      );
    }
  };
};

export const signoutUser = (user) => {
  unsetUserAccount(user);
  window.location.reload();
};
