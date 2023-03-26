import * as baseHttpService from "./base-http.service";

export const getUsers = () => {
  return baseHttpService.get("users");
};

export const getUser = (id) => {
  return baseHttpService.get(`users/${id}`);
};

export const createUser = async (data) => {
  return baseHttpService.post(`users`, data);
};

export const updateUser = async (id, data) => {
  return baseHttpService.put(`users/${id}`, data);
};

export const deleteUser = async (id) => {
  return baseHttpService._delete(`users/${id}`);
};
