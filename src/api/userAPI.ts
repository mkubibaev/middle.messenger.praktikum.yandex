import { HttpClient } from 'core';
import { PasswordDTO, ProfileDTO } from './types';

const http = new HttpClient(`${process.env.API_ENDPOINT}user`);

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
}

export default new UserAPI();
