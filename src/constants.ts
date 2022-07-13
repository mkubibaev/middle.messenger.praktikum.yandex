import { NavLink } from './types';

export const USER_NAV: NavLink[] = [
  {
    label: 'Чат',
    path: '/messenger',
  },
  {
    label: 'Профиль',
    path: '/settings',
  },
  {
    label: 'Выход',
    path: '/',
  },
];

export const ANONYMOUS_NAV: NavLink[] = [
  {
    label: 'Вход',
    path: '/',
  },
  {
    label: 'Регистрация',
    path: '/sign-up',
  },
];
