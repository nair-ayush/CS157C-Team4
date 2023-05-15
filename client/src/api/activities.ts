import { GenericAndErrorResponse, TActivity } from "../lib/types";
import { getRandomActivityImage } from "../lib/util";
import api from "./api";

export const listAllActivities = (config = {}): Promise<TActivity[]> =>
  api.get("activities", config).then((res) =>
    res.data.map((item: TActivity) => ({
      ...item,
      imageURL: getRandomActivityImage(),
    }))
  );

export const getActivity = (
  activityId: string,
  config = {}
): Promise<TActivity> =>
  api
    .get(`activities/${activityId}`, config)
    .then((res) => ({ ...res.data, imageURL: getRandomActivityImage() }));

export const addActivity = (
  body: any,
  config = {}
): Promise<GenericAndErrorResponse> =>
  api.post("activities", body, config).then((res) => res.data);

export const updateActivity = (
  body: any,
  config = {}
): Promise<GenericAndErrorResponse> =>
  api.put(`activities/${body.id}`, body, config).then((res) => res.data);

export const deleteActivity = (
  activityId: string,
  config = {}
): Promise<GenericAndErrorResponse> =>
  api.delete(`activities/${activityId}`, config).then((res) => res.data);

export const getActivitiesByLocation = async (
  location: string,
  config = {}
): Promise<TActivity[]> =>
  api
    .get(`activities/location/${encodeURIComponent(location)}`, config)
    .then((res) =>
      res.data.map((item: TActivity) => ({
        ...item,
        imageURL: getRandomActivityImage(),
      }))
    );

export const getTrendingActivities = async (
  limit: number = 5,
  config = {}
): Promise<TActivity[]> =>
  api.get(`activities/trending/${limit}`, config).then((res) =>
    res.data.map((item: TActivity) => ({
      ...item,
      imageURL: getRandomActivityImage(),
    }))
  );
