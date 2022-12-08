import { HttpClient } from 'core';
import { LoginPayload } from 'services';
import { API_ENDPOINT } from 'utils';
import { RegisterDTO, UserDTO } from './types';

const http = new HttpClient(`${API_ENDPOINT}/auth`);

class AuthAPI {
  login(data: LoginPayload) {
    return http.post<{}>('/signin', { data, headers: { 'content-type': 'application/json' } });
  }

  logout() {
    return http.post('/logout');
  }

  register(data: RegisterDTO) {
    return http.post('/signup', { data, headers: { 'content-type': 'application/json' } });
  }

  getUser() {
    return http.get<UserDTO>('/user');
  }
}

export default new AuthAPI();
