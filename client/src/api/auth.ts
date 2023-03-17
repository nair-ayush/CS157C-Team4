import { IUser } from "../App";
import api from "./api";

export interface IAuthForm {
  name?: string;
  username: string;
  password: string;
}

export const login = (body: IAuthForm, config = {}): Promise<IUser> =>
  api.post("auth/login", body, config).then((res) => res.data);
export const register = (body: IAuthForm, config = {}): Promise<IUser> =>
  api.post(`auth/register`, body, config).then((res) => res.data); // TODO body interface for register and login
export const logout = (userId: string, config = {}) =>
  api.delete(`auth/logout/${userId}`, config).then((res) => res.data);
