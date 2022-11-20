export type APIError = {
  reason: string;
};

export type Response<T> = T | APIError;

export type LoginRequestData = {
  login: string;
  password: string;
};

export type RegisterDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type Profile = {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
};

export type ProfileDTO = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type PasswordDTO = {
  oldPassword: string;
  newPassword: string;
};
