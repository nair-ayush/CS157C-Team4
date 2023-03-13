import api from "./api";

export const login = (body: any, config = {}) =>
  api.post("login", body, config).then((res) => res.data);
export const register = (body: any, config = {}) =>
  api.post(`register`, body, config).then((res) => res.data); // TODO body interface for register and login
export const logout = (userId: string, config = {}) =>
  api.delete(`logout/${userId}`, config).then((res) => res.data);
