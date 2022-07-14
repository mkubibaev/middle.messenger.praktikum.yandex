import { BlockConstructable } from 'core';
import {
  LoginPage,
  RegisterPage,
  ChatsPage,
  ProfilePage,
  ProfileChangeDataPage,
  ProfileChangePasswordPage,
  ErrorPage,
  Error404Page,
} from 'pages';

export enum Pages {
  Login = 'login',
  Register = 'sign-up',
  Chats = 'messenger',
  Profile = 'settings',
  ProfileChangeData = 'profile-change-data',
  ProfileChangePassword = 'profile-change-password',
  Error = 'error',
  Error404 = 'error404',
}

const pagesMap: Record<Pages, BlockConstructable<any>> = {
  [Pages.Login]: LoginPage,
  [Pages.Register]: RegisterPage,
  [Pages.Chats]: ChatsPage,
  [Pages.Profile]: ProfilePage,
  [Pages.ProfileChangeData]: ProfileChangeDataPage,
  [Pages.ProfileChangePassword]: ProfileChangePasswordPage,
  [Pages.Error]: ErrorPage,
  [Pages.Error404]: Error404Page,
};

export const getPageComponent = (page: Pages): BlockConstructable<any> => {
  return pagesMap[page];
};