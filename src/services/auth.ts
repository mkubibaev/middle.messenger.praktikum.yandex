import { Dispatch } from 'core';
import { apiHasError, transformToRegisterDTO, transformUser } from 'utils';
import authAPI from 'api/authAPI';
import { UserDTO } from 'api/types';
import { LoginPayload, RegisterPayload } from './types';

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();
  dispatch({ isLoading: false, user: null });

  window.router.go('/');
};

export const login = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: LoginPayload,
) => {
  dispatch({ isLoading: true, loginFormError: null });

  const response = await authAPI.login(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.getUser();
  dispatch({ isLoading: false, loginFormError: null });
  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('/messenger');
};

export const register = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: RegisterPayload,
) => {
  dispatch({ isLoading: true, registerFormError: null });

  const registerDTO = transformToRegisterDTO(payload);
  const response = await authAPI.register(registerDTO);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, registerFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false, registerFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('/messenger');
};
