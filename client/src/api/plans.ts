import api from "./api";

export const listAllPlans = (config = {}) =>
  api.get("plan", config).then((res) => res.data);
export const getActivity = (activityId: string, config = {}) =>
  api.get(`plan/${activityId}`, config).then((res) => res.data);
export const addActivity = (body: any, config = {}) =>
  api.post("plan", body, config).then((res) => res.data); // TODO body interface for activity
export const deleteActivity = (activityId: string, config = {}) =>
  api.delete(`plan/${activityId}`, config).then((res) => res.data);
