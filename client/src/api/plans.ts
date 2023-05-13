import { TPlan } from "../lib/types";
import api from "./api";

export const listAllPlans = (config = {}) => {
  // api.get("plan", config).then((res) => res.data);
  return [
    {
      budget: 3,
      imageURL:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1844&q=80",
      startDate: "2023-05-21",
      endDate: "2023-05-27",
      id: "123",
      location: "San Fransico",
      stayId: "1234",
      stayName: "Hotel Fairmont at Plaza",
      activities: [
        { id: "1234", name: "Wonder Wheel" },
        { id: "1233432", name: "Museum" },
      ],
      createdOn: "2023-04-23",
      createdBy: "123424",
    },
    {
      budget: 3,
      imageURL:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1844&q=80",
      startDate: "2023-05-21",
      endDate: "2023-05-27",
      id: "533",
      location: "San Fransico",
      stayId: "1234",
      stayName: "Hotel Fairmont at Plaza",
      activities: [
        { id: "1234", name: "Wonder Wheel" },
        { id: "1233432", name: "Museum" },
      ],
      createdOn: "2023-04-23",
      createdBy: "123424",
    },
    {
      budget: 3,
      imageURL:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1844&q=80",
      startDate: "2023-05-21",
      endDate: "2023-05-27",
      id: "6547464",
      location: "San Fransico",
      stayId: "1234",
      stayName: "Hotel Fairmont at Plaza",
      activities: [
        { id: "1234", name: "Wonder Wheel" },
        { id: "1233432", name: "Museum" },
      ],
      createdOn: "2023-04-23",
      createdBy: "123424",
    },
  ];
};
export const getPlanById = (planId: string, config = {}) => {
  // api.get(`plan/${planId}`, config).then((res) => res.data);
  return {
    budget: 3,
    imageURL:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1844&q=80",
    startDate: "2023-05-21",
    endDate: "2023-05-27",
    id: "123",
    location: "San Francisco",
    stayId: "1234",
    stayName: "Hotel Fairmont at Plaza",
    activities: [
      { id: "1234", name: "Wonder Wheel" },
      { id: "1233432", name: "Museum" },
    ],
    createdOn: "2023-04-23",
    createdBy: "123424",
  };
};
export const addPlan = (body: any, config = {}) =>
  api.post("plan", body, config).then((res) => res.data); // TODO body interface for Plan
export const deletePlan = (planId: string, config = {}) =>
  api.delete(`plan/${planId}`, config).then((res) => res.data);
export const getPlansByUser = (userId: number, config = {}) => {
  // return api.get(`plan/user${userId}`).then((res) => res.data);
  return {
    userPlans: [
      {
        budget: 3,
        imageURL:
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1844&q=80",
        startDate: "2023-05-21",
        endDate: "2023-05-27",
        id: "123",
        location: "San Fransico",
        stayId: "1234",
        stayName: "Hotel Fairmont at Plaza",
        activities: [
          { id: "1234", name: "Wonder Wheel" },
          { id: "1233432", name: "Museum" },
        ],
        createdOn: "2023-04-23",
        createdBy: "123424",
      },
    ],
    savedPlans: [
      {
        budget: 3,
        imageURL:
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1844&q=80",
        startDate: "2023-05-21",
        endDate: "2023-05-27",
        id: "123",
        location: "San Fransico",
        stayId: "1234",
        stayName: "Hotel Fairmont at Plaza",
        activities: [
          { id: "1234", name: "Wonder Wheel" },
          { id: "1233432", name: "Museum" },
        ],
        createdOn: "2023-04-23",
        createdBy: "123424",
      },
    ],
  };
};

export const getTrendingPlans = async (config = {}): Promise<TPlan[]> => [
  {
    budget: 3,
    imageURL:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1844&q=80",
    startDate: "2023-05-21",
    endDate: "2023-05-27",
    id: "123",
    location: "San Fransico",
    stayId: "1234",
    stayName: "Hotel Fairmont at Plaza",
    activities: [
      { id: "1234", name: "Wonder Wheel" },
      { id: "1233432", name: "Museum" },
    ],
    createdOn: "2023-04-23",
    createdBy: "123424",
  },
];
