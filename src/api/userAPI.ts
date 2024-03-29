import { HttpClient } from 'core';
import { API_ENDPOINT } from 'utils';
import { PasswordDTO, ProfileDTO, UserDTO } from './types';

const http = new HttpClient(`${API_ENDPOINT}/user`);

class UserAPI {
  changeAvatar(data: FormData) {
    return http.put('/profile/avatar', { data });
  }

  changeProfile(data: ProfileDTO) {
    return http.put('/profile', { data, headers: { 'content-type': 'application/json' } });
  }

  changePassword(data: PasswordDTO) {
    return http.put('/password', { data, headers: { 'content-type': 'application/json' } });
  }

  searchByLogin(data: { login: string }) {
    return http.post<UserDTO[]>('/search', { data, headers: { 'content-type': 'application/json' } });
  }
}

export default new UserAPI();
