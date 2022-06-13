import { Contact, Message, NavLink, User } from 'types';

export const user: User = {
  first_name: 'Иван',
  second_name: 'Иванов',
  login: 'ivan',
  email: 'ivan@ivan.ru',
  phone: '+71231231234',
};

export const userAvatar = 'https://robohash.org/51e6d8f1948e909898302c6b9edcc05d?set=set1&bgset=bg1&size=400x400';

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Максим',
    avatar: 'https://robohash.org/0d2d55339b9e4d567e9c7f03fdf3497a?set=set1&bgset=bg1&size=400x400',
    message: 'Друзья, у меня для вас ос...',
    lastSeen: '12:45',
    notif: 0,
  },
  {
    id: '2',
    name: 'Стас Рогозин',
    avatar: 'https://robohash.org/b044b060af64d952d16cd3e07c3e8d4a?set=set1&bgset=bg2&size=400x400',
    message: 'Друзья, у меня для вас ос...',
    lastSeen: '11:06',
    notif: 1,
  },
  {
    id: '3',
    name: 'ВМКС 2-08',
    avatar: 'https://robohash.org/17e1f87eda9eb8279c230ed360d12115?set=set3&bgset=bg2&size=400x400',
    message: 'Вы: Спасибо!',
    lastSeen: '1 Мая 2022',
    notif: 0,
  },
];

export const anonymousNav: NavLink[] = [
  {
    label: 'Вход',
    url: './login.html',
  },
  {
    label: 'Регистрация',
    url: './register.html',
  },
];

export const userNav: NavLink[] = [
  {
    label: 'Чат',
    url: './index.html',
  },
  {
    label: 'Профиль',
    url: './profile.html',
  },
  {
    label: 'Выход',
    url: './login.html',
  },
];

export const messages: Message[] = [
  {
    text: 'Друзья, у меня для вас особенные новости! это текст-"рыба", часто используемый в печати и вэб-дизайне',
    dateTime: '10:00',
    own: true,
    status: 3,
  },
  {
    text: 'Друзья, у меня для вас особенные новости! это текст-"рыба", часто используемый в печати и вэб-дизайне.'
      + 'Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    dateTime: '11:00',
    own: false,
  },
  {
    text: 'Друзья, у меня для вас особенные новости! это текст-"рыба", часто используемый в печати и вэб-дизайне',
    dateTime: '10:00',
    own: true,
    status: 3,
  },
  {
    text: 'Друзья, у меня для вас особенные новости! это текст-"рыба", часто используемый в печати и вэб-дизайне.'
      + 'Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    dateTime: '11:00',
    own: false,
  },
  {
    text: 'Друзья, у меня для вас особенные новости! это текст-"рыба", часто используемый в печати и вэб-дизайне',
    dateTime: '10:00',
    own: true,
    status: 2,
  },
  {
    text: 'Друзья, у меня для вас особенные новости! это текст-"рыба", часто используемый в печати и вэб-дизайне.'
      + 'Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    dateTime: '11:00',
    own: false,
  },
];
