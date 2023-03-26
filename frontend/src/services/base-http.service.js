import axios from "axios";

const BASE_URL = "https://supabase.mymapbackend.xyz/api"

let _accessToken = null;

export const get = async (endpoint, options = {}) => {
  Object.assign(options, _getCommonOptions());
  return axios
    .get(`${BASE_URL}/${endpoint}`, options)
    .catch((error) => _handleHttpError(error));
};

export const post = async (endpoint, data = {}, options = {}) => {
  Object.assign(options, _getCommonOptions());
  return axios
    .post(`${BASE_URL}/${endpoint}`, data, options)
    .catch((error) => _handleHttpError(error));
};

export const put = async (endpoint, data = {}, options = {}) => {
  Object.assign(options, _getCommonOptions());
  return axios
    .put(`${BASE_URL}/${endpoint}`, data, options)
    .catch((error) => _handleHttpError(error));
};

export const _delete = async (endpoint, options = {}) => {
  Object.assign(options, _getCommonOptions());
  return axios
    .delete(`${BASE_URL}/${endpoint}`, options)
    .catch((error) => _handleHttpError(error));
};

export const patch = async (endpoint, data = {}, options = {}) => {
  Object.assign(options, _getCommonOptions());
  return axios
    .patch(`${BASE_URL}/${endpoint}`, data, options)
    .catch((error) => _handleHttpError(error));
};

export const isAuthenticated = () => {
  return loadToken() ? true : false;
};

const _handleHttpError = (error) => {
  const { statusCode } = error.response.data;

  if (statusCode !== 401) {
    throw error;
  } else {
    return _handle401();
  }
};

const _handle401 = () => {
  window.location.href = "/login";
};

const _getCommonOptions = () => {
  const token = loadToken();

  return {
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  };
};

export const accessToken = () => {
  return _accessToken ? _accessToken : loadToken();
};

export const saveToken = (accessToken) => {};

export const loadToken = () => {
  try {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:auth")).auth
    ).token;
    _accessToken = token;
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeToken = async () => {
  _accessToken = null;
};
