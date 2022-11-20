import { Dispatch } from 'core';
import userAPI from 'api/userAPI';
import { PasswordDTO, Profile, UserDTO } from 'api/types';
import { apiHasError, transformToProfileDTO, transformUser } from 'utils';

export const chaneAvatar = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: FormData,
) => {
  dispatch({ isLoading: true, avatarFormError: null });

  const response = await userAPI.changeAvatar(payload);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, avatarFormError: response.reason });
    return;
  }

  dispatch({ isLoading: false, user: transformUser(response as UserDTO) });
};

export const changeProfile = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: Profile,
) => {
  dispatch({ isLoading: true, profileFormError: null });

  const data = transformToProfileDTO(payload);
  const response = await userAPI.changeProfile(data);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, profileFormError: response.reason });
    return;
  }

  dispatch({ isLoading: false, user: transformUser(response as UserDTO) });
  window.router.go('/settings');
};

export const changePassword = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: PasswordDTO,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.changePassword(payload);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, passwordFormError: response.reason });
    return;
  }

  dispatch({ isLoading: false });
  window.router.go('/settings');
};
