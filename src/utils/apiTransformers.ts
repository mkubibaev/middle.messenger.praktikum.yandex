import { Profile, ProfileDTO, RegisterDTO, UserDTO } from 'api/types';
import { RegisterPayload } from 'services/types';
import { RegisterRequestData } from '../api/types';

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};

export const transformToRegisterDTO = (data: RegisterPayload): RegisterDTO => {
  return {
    first_name: data.firstName,
    second_name: data.secondName,
    login: data.login,
    email: data.email,
    phone: data.phone,
    password: data.password,
  };
};

export const transformToProfileDTO = (data: Profile): ProfileDTO => {
  return {
    first_name: data.firstName,
    second_name: data.secondName,
    display_name: data.displayName,
    login: data.login,
    email: data.email,
    phone: data.phone,
  };
};


