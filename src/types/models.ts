export type User = {
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  email: string;
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
