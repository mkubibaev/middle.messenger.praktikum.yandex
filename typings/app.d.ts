import { Pages } from '../src/utils';
import { Dispatch } from '../src/core';
import { Chat, Message } from '../src/services';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed<T = unknown> = {
    [key in string]: T;
  };

  export type AppState = {
    appIsInited: boolean;
    page: Pages | null;
    isLoading: boolean;
    user: User | null;
    chats: Chat[];
    messages: Message[];
    chatSocket: WebSocket | null;
    loginFormError: string | null;
    registerFormError: string | null;
    avatarFormError: string | null;
    profileFormError: string | null;
    passwordFormError: string | null;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type NavLink = {
    label: string;
    path: string;
    action?: (dispatch: Dispatch<AppState>) => Promise<void>;
  };
}

export {};
