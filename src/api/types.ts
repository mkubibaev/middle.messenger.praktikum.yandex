export type APIError = {
  reason: string;
};

export type Response<T> = T | APIError;

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

export type ProfilePayload = {
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

export type ChatDTO = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number,
  last_message: {
    user: UserDTO,
    time: string;
    content: string;
  }
};
