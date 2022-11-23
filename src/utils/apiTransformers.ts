import { ProfilePayload, ProfileDTO, RegisterDTO, UserDTO, ChatDTO } from 'api';
import { Chat, RegisterPayload } from 'services';

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

export const transformToProfileDTO = (data: ProfilePayload): ProfileDTO => {
  return {
    first_name: data.firstName,
    second_name: data.secondName,
    display_name: data.displayName,
    login: data.login,
    email: data.email,
    phone: data.phone,
  };
};

export const transformChat = (data: ChatDTO): Chat => {
  return {
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    unreadCount: data.unread_count,
    lastMessage: data.last_message ? {
      user: transformUser(data.last_message.user),
      time: data.last_message.time,
      content: data.last_message.content,
    } : null,
  };
};
