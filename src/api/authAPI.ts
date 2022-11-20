import { HttpClient } from 'core';
import { LoginRequestData, RegisterRequestData } from './types';

const http = new HttpClient(`${process.env.API_ENDPOINT}auth`);

class AuthAPI {
  login(data: LoginRequestData) {
    return http.post('/signin', { data, headers: { 'content-type': 'application/json' } });
  }

  logout() {
    return http.post('/logout');
  }

  register(data: RegisterRequestData) {
    return http.post('/signup', { data, headers: { 'content-type': 'application/json' } });
  }

  getUser() {
    return http.get('/user');
  }
}

export default new AuthAPI();
