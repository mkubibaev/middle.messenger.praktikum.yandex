import { Pages } from '../src/utils';

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
    loginFormError: string | null;
    registerFormError: string | null;
    user: User | null;
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
}

export {};