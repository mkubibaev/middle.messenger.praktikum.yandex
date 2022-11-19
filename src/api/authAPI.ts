import { HttpClient } from 'core';
import { LoginRequestData, RegisterRequestData } from './types';

const http = new HttpClient(process.env.API_ENDPOINT!);

class AuthAPI {
  login(data: LoginRequestData) {
    return http.post('auth/signin', { data });
  }

  logout() {
    return http.post('auth/logout');
  }

  register(data: RegisterRequestData) {
    return http.post('auth/signup', { data });
  }

  getUser() {
    return http.get('auth/user');
  }
}

export default new AuthAPI();
