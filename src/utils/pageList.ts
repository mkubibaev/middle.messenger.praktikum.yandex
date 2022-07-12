import { BlockConstructable } from 'core';
import {
  OnBoardingPage,
  LoginPage,
  RegisterPage,
  ChatsPage,
  ProfilePage,
  ProfileChangeDataPage,
  ProfileChangePasswordPage,
} from 'pages';

export enum Pages {
  OnBoarding = 'onboarding',
  Login = 'login',
  Register = 'register',
  Chats = 'chats',
  Profile = 'profile',
  ProfileChangeData = 'profile-change-data',
  ProfileChangePassword = 'profile-change-password',
}

const pagesMap: Record<Pages, BlockConstructable<any>> = {
  [Pages.OnBoarding]: OnBoardingPage,
  [Pages.Login]: LoginPage,
  [Pages.Register]: RegisterPage,
  [Pages.Chats]: ChatsPage,
  [Pages.Profile]: ProfilePage,
  [Pages.ProfileChangeData]: ProfileChangeDataPage,
  [Pages.ProfileChangePassword]: ProfileChangePasswordPage,

};

export const getPageComponent = (page: Pages): BlockConstructable<any> => {
  return pagesMap[page];
};
