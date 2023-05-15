import { TLogin, TSignup } from "../lib/types";
import api from "./api";

export const login = (body: TLogin, config = {}) => {
  const requestBody = { username: body.email, password: body.password };
  return api.post("auth/login", requestBody, config).then((res) => res.data);
};
export const register = (body: TSignup, config = {}) => {
  const requestBody = {
    name: body.fullname,
    username: body.email,
    password: body.password,
  };
  return api.post(`auth/register`, requestBody, config).then((res) => res.data); // TODO body interface for register and login
};
export const logout = (userId: string, config = {}) =>
  api.delete(`auth/logout/${userId}`, config).then((res) => res.data);

export const getAdminMetrics = (config = {}) => ({
  numUsers: 15,
  numPlans: 20,
  numPublicPlans: 14,
  numListings: 50,
  numActivities: 75,
});
