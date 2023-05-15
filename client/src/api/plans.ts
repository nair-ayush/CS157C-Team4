import { GenericAndErrorResponse, TPlan } from "../lib/types";
import { getRandomCityImage } from "../lib/util";
import api from "./api";

export const listAllPlans = (config = {}): Promise<TPlan[]> =>
  api.get("plans", config).then((res) =>
    res.data.map((item: TPlan) => ({
      ...item,
      imageURL: getRandomCityImage(),
    }))
  );

export const getPlanById = (planId: string, config = {}): Promise<TPlan> =>
  api
    .get(`plans/${planId}`, config)
    .then((res) => ({ ...res.data, imageURL: getRandomCityImage() }));

export const addPlan = (
  body: TPlan,
  config = {}
): Promise<GenericAndErrorResponse> =>
  api.post("plans", body, config).then((res) => res.data);

export const updatePlan = (
  body: TPlan,
  config = {}
): Promise<GenericAndErrorResponse> =>
  api.put(`plans/${body.id}`, body, config).then((res) => res.data);

export const deletePlan = (
  planId: string,
  config = {}
): Promise<GenericAndErrorResponse> =>
  api.delete(`plans/${planId}`, config).then((res) => res.data);

export const getPlansByUser = (userId: string, config = {}): Promise<TPlan[]> =>
  api.get(`plans/user/${userId}`, config).then((res) =>
    res.data.map((item: TPlan) => ({
      ...item,
      imageURL: getRandomCityImage(),
    }))
  );

export const getSavedPlansByUser = (
  userId: string,
  config = {}
): Promise<TPlan[]> =>
  api.get(`plans/saved/${userId}`, config).then((res) =>
    res.data.map((item: TPlan) => ({
      ...item,
      imageURL: getRandomCityImage(),
    }))
  );

export const getTrendingPlans = async (
  limit: number = 5,
  config = {}
): Promise<TPlan[]> =>
  api.get(`plans/trending/${limit}`, config).then((res) =>
    res.data.map((item: TPlan) => ({
      ...item,
      imageURL: getRandomCityImage(),
    }))
  );
