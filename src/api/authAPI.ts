import { HttpClient } from 'core';
import { LoginRequestData, RegisterRequestData } from './types';

const http = new HttpClient(process.env.API_ENDPOINT!);

class AuthAPI {
  login = (data: LoginRequestData) => http.post('auth/signin', { data })
    .then(({ response }) => response);

  register = (data: RegisterRequestData) => http.post('auth/signup', { data })
    .then(({ response }) => response);

  me = () => http.get('auth/user')
    .then(({ response }) => response);

  logout = () => http.post('auth/logout');
}

export default new AuthAPI();
