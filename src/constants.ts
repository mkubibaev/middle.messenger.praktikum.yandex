import { NavLink } from './types';

export const USER_NAV: NavLink[] = [
  {
    label: 'Чат',
    url: '/chats',
  },
  {
    label: 'Профиль',
    url: '/profile',
  },
  {
    label: 'Выход',
    url: '/login',
  },
];

export const ANONYMOUS_NAV: NavLink[] = [
  {
    label: 'Вход',
    url: '/login',
  },
  {
    label: 'Регистрация',
    url: '/register',
  },
];
