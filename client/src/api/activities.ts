import api from "./api";

export const listAllActivities = (config = {}) =>
  api.get("activities", config).then((res) => res.data);
export const getActivity = (activityId: string, config = {}) =>
  api.get(`activities/${activityId}`, config).then((res) => res.data);
export const addActivity = (body: any, config = {}) =>
  api.post("activities", body, config).then((res) => res.data); // TODO body interface for activity
export const deleteActivity = (activityId: string, config = {}) =>
  api.delete(`activities/${activityId}`, config).then((res) => res.data);

export const getActivitiesByLocation = async (
  location: string,
  config = {}
) => [{ id: "4234234", name: "Museum" }];
