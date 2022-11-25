import { Dispatch } from 'core';
import { userAPI, PasswordDTO, ProfilePayload, UserDTO } from 'api';
import { apiHasError, transformToProfileDTO, transformUser } from 'utils';

export const chaneAvatar = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: FormData,
) => {
  try {
    dispatch({ isLoading: true, avatarFormError: null });

    const response = await userAPI.changeAvatar(payload);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, avatarFormError: response.reason });
      return;
    }

    dispatch({ isLoading: false, user: transformUser(response as UserDTO) });
  } catch (err) {
    console.log(err);
  }
};

export const changeProfile = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: ProfilePayload,
) => {
  try {
    dispatch({ isLoading: true, profileFormError: null });

    const data = transformToProfileDTO(payload);
    const response = await userAPI.changeProfile(data);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, profileFormError: response.reason });
      return;
    }

    dispatch({ isLoading: false, user: transformUser(response as UserDTO) });
    window.router.go('/settings');
  } catch (err) {
    console.log(err);
  }

};

export const changePassword = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: PasswordDTO,
) => {
  try {
    dispatch({ isLoading: true });

    const response = await userAPI.changePassword(payload);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, passwordFormError: response.reason });
      return;
    }

    dispatch({ isLoading: false });
    window.router.go('/settings');
  } catch (err) {
    console.log(err);
  }
};

export const searchUser = (payload: { login: string }) => {
  try {
    return userAPI.searchByLogin(payload);
  } catch (err) {
    console.log(err);
    return err;
  }
};
