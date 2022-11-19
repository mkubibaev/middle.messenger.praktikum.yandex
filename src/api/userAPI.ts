import { HttpClient } from 'core';
import { PasswordData, UserData } from './types';

const http = new HttpClient(`${process.env.API_ENDPOINT}user/`);

class UserAPI {
  changeProfile = (data: UserData) => http.put('profile', { data })
    .then(({ response }) => response);

  changePassword = (data: PasswordData) => http.put('password', { data })
    .then(({ response }) => response);
}

export default new UserAPI();
