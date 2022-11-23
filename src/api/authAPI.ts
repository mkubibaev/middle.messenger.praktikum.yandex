import { HttpClient } from 'core';
import { LoginPayload } from 'services';
import { RegisterDTO } from './types';

const http = new HttpClient(`${process.env.API_ENDPOINT}auth`);

class AuthAPI {
  login(data: LoginPayload) {
    return http.post('/signin', { data, headers: { 'content-type': 'application/json' } });
  }

  logout() {
    return http.post('/logout');
  }

  register(data: RegisterDTO) {
    return http.post('/signup', { data, headers: { 'content-type': 'application/json' } });
  }

  getUser() {
    return http.get('/user');
  }
}

export default new AuthAPI();
