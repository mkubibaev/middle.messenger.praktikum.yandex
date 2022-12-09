import { HttpClient } from 'core';
import { API_ENDPOINT } from 'utils';
import { ChatDTO, UserDTO } from './types';

const http = new HttpClient(`${API_ENDPOINT}/chats`);

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

  getChatToken(chatId: number) {
    return http.post<{ token: string }>(`/token/${chatId}`);
  }
}

export default new ChatAPI();
