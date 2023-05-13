import { Moment } from "moment";

export type TLocation = {
  name: string;
  imageURL: string;
};

export type TFActivity = {
  id: string;
  name: string;
};

export type TPlan = {
  budget: number;
  imageURL: string;
  // savedbyUsers: number[];
  startDate: string;
  endDate: string;
  id: string;
  location: string;
  stayId: string;
  stayName: string;
  activities: TFActivity[];
  createdOn: string;
  updatedOn?: string;
  createdBy: string;
};

export interface IAuthForm {
  fullname?: string;
  email: string;
  password: string;
  cpassword?: string;
}

export type TLogin = {
  email: string;
  password: string;
};

export type TSignup = {
  fullname: string;
  email: string;
  password: string;
};

export type TSearch = {
  location?: string;
  numGuests?: number;
  checkInDate?: string | Moment | null;
  checkOutDate?: string | Moment | null;
  budget?: string | null;
  filters?: string[];
};

export type TPlanForm = {
  id?: string;
  stayId?: string;
  stayName?: string;
  activities?: TFActivity[];
  location?: string;
  startDate?: string | Moment | null;
  endDate?: string | Moment | null;
  imageURL?: string;
  budget?: string;
};
