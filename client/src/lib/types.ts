export type TLocation = {
  label: string;
  navigateTo: string;
  imageURL: string;
};

export type TPlan = {
  label: string;
  navigateTo: string;
  budget: number;
  numDays: number;
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
