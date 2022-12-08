import { userAPI, PasswordDTO, ProfilePayload, UserDTO } from 'api';
import { apiHasError, transformToProfileDTO, transformUser } from 'utils';
import { DispatchStateHandler } from 'core';

export const chaneAvatar: DispatchStateHandler<FormData> = async (
  dispatch,
  _state,
  payload,
) => {
  try {
    dispatch({ isLoading: true, avatarFormError: null });

    const response = await userAPI.changeAvatar(payload);

    if (apiHasError(response.data)) {
      dispatch({ isLoading: false, avatarFormError: response.data.reason });
      return;
    }

    dispatch({ isLoading: false, user: transformUser(response.data as UserDTO) });
  } catch (err) {
    console.log(err);
  }
};

export const changeProfile: DispatchStateHandler<ProfilePayload> = async (
  dispatch,
  _state,
  payload,
) => {
  try {
    dispatch({ isLoading: true, profileFormError: null });

    const data = transformToProfileDTO(payload);
    const response = await userAPI.changeProfile(data);

    if (apiHasError(response.data)) {
      dispatch({ isLoading: false, profileFormError: response.data.reason });
      return;
    }

    dispatch({ isLoading: false, user: transformUser(response.data as UserDTO) });
    window.router.go('/settings');
  } catch (err) {
    console.log(err);
  }
};

export const changePassword: DispatchStateHandler<PasswordDTO> = async (
  dispatch,
  _state,
  payload,
) => {
  try {
    dispatch({ isLoading: true });

    const response = await userAPI.changePassword(payload);

    if (apiHasError(response.data)) {
      dispatch({ isLoading: false, passwordFormError: response.data.reason });
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
    return { data: [] };
  }
};
