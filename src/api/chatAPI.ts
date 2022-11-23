import { HttpClient } from 'core';
import { ChatDTO, UserDTO } from './types';

const http = new HttpClient(`${process.env.API_ENDPOINT}chats`);

class ChatAPI {
  getChats() {
    return http.get<ChatDTO[]>('');
  }

  createChat(data: { title: string }) {
    return http.post('', { data, headers: { 'content-type': 'application/json' } });
  }

  deleteChat(data: { chatId: number }) {
    return http.delete('', { data, headers: { 'content-type': 'application/json' } });
  }

  getChatUsers(chatId: number) {
    return http.get<UserDTO[]>(`/${chatId}/users`);
  }

  addUsersToChat(data: { users: number[], chatId: number }) {
    return http.put('/users', { data, headers: { 'content-type': 'application/json' } });
  }

  deleteUsersFromChat(data: { users: number[], chatId: number }) {
    return http.delete('/users', { data, headers: { 'content-type': 'application/json' } });
  }
}

export default new ChatAPI();
