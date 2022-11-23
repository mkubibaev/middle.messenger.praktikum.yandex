export type LoginPayload = {
  login: string;
  password: string;
};

export type RegisterPayload = {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string | null;
  unreadCount: number,
  lastMessage: {
    user: User,
    time: string;
    content: string;
  } | null
};
