import { Moment } from "moment";

export type GenericAndErrorResponse = { message: string };

export type TFStay = {
  name: string;
  id: string;
};

export type TFActivity = {
  id: string;
  name: string;
};

export type TFListing = {
  id: string;
  name: string;
};
export type TFUser = {
  id: string;
  name: string;
};

export type TPlan = {
  id: string;
  name: string;
  budget: number;
  isPublic: boolean;
  shareUrl: string;
  imageURL: string;
  startDate: string;
  endDate: string;
  stay: TFStay;
  activities: TFActivity[];
  createdOn: string;
  updatedOn?: string;
  createdBy: TFUser;
};

export type TPlanForm = {
  id?: string;
  activities?: string[];
  name: string;
  stay?: string;
  startDate?: string | Moment | null;
  endDate?: string | Moment | null;
  budget?: number | string;
};

export type TListing = {
  id: string;
  imageURL: string;
  name: string;
  location: string;
  price: number;
  hostId: string;
  hostName: string;
  amenities: string[];
  createdOn: string;
  createdBy: TFUser;
  updatedOn: string;
};

export type TActivity = {
  id: string;
  name: string;
  location: string;
  price: number;
  metadata: string[];
  createdOn: string;
  createdBy: TFUser;
  updatedOn: string;
  imageURL: string;
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
