import api from "./api";

export const listAllUsers = (config = {}) =>
  api.get("users", config).then((res) => res.data);
export const getUser = (userId: string, config = {}) =>
  api.get(`users/${userId}`, config).then((res) => res.data);
export const deleteUser = (userId: string, config = {}) =>
  api.delete(`users/${userId}`, config).then((res) => res.data);
