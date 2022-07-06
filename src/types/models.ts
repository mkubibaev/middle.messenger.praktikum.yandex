export type User = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
};

export type Contact = {
  id: string;
  name: string;
  avatar: string;
  message: string;
  lastSeen: string;
  notif: number;
};

export type Message = {
  text: string;
  dateTime: string;
  own: boolean;
  status?: number;
};
