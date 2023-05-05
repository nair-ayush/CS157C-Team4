import { TLogin, TSignup } from "../lib/types";
import api from "./api";

export const login = (body: TLogin, config = {}) =>
  api.post("auth/login", body, config).then((res) => res.data);
export const register = (body: TSignup, config = {}) =>
  api.post(`auth/register`, body, config).then((res) => res.data); // TODO body interface for register and login
export const logout = (userId: string, config = {}) =>
  api.delete(`auth/logout/${userId}`, config).then((res) => res.data);
