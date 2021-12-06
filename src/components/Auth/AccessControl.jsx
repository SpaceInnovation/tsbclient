import {
  getFromLocalStorage,
  addToLocalStorage,
  removeFromLocalStorage,
} from "../../helpers/browserStorage";

import { BACKEND_URL, API_KEY } from "../../actions/api";

const LS_KEY = "tsb-login:";

export const getUserToken = (user) => {
  try {
    if (user === "admin") {
      return JSON.parse(getFromLocalStorage(`${LS_KEY}${user}`));
    }
  } catch (error) {
    return console.log(error.message);
  }
};

export const getUserData = ({ user, _id, token }) => {
  let accessToken = token;
  let userId = _id;
  if (!accessToken) accessToken = getUserToken(user);
  if (!_id) userId = _id || getUserId(user);
  if (typeof accessToken !== "string") return Promise.resolve(false);
  if (!userId) return Promise.resolve(false);
  return fetch(
    `${BACKEND_URL}/${user.toLowerCase()}/details/${userId}?key=${API_KEY}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((responseJSON) => {
      if (responseJSON) {
        return responseJSON;
      }
      return false;
    })
    .catch((ex) => {
      throw ex;
    });
};

export const setUserAccount = ({ user, _id, token }) => {
  return getUserData({ user, _id, token })
    .then((profile) => {
      let strippedDownProfile = {};
      if (user === "admin") {
        strippedDownProfile = {
          _id,
          email: profile.email,
          role: profile.role,
          username: profile.username,
        };
      }
      const data = { token, profile: strippedDownProfile };
      addToLocalStorage(`${LS_KEY}${user}`, JSON.stringify(data));
      return { token, profile: strippedDownProfile };
    })
    .catch((ex) => ex.message);
};

export const getUserId = (user) => {
  try {
    const data = JSON.parse(getFromLocalStorage(`${LS_KEY}${user}`));
    return data.profile ? data.profile._id : false;
  } catch (ex) {
    return false;
  }
};

/** Refactored to return only fields needed for validation */
export const getStrippedDownProfile = (user) =>
  JSON.parse(getFromLocalStorage(`${LS_KEY}${user}`)).profile || {};

export const isVerified = (user) => {
  try {
    const { token } = getUserToken(user);
    const profile = getStrippedDownProfile(user);
    if (!profile._id || !token) return false;
    if (profile !== null && typeof profile === "object") return true;
  } catch (error) {
    return console.log(error.message);
  }
};
export const unsetUserAccount = (user) => {
  try {
    removeFromLocalStorage(`${LS_KEY}${user}`);
  } catch (ex) {
    console.log(ex.message);
  }
};
