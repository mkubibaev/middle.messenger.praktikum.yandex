import { Dispatch } from 'core';
import { apiHasError, transformUser } from 'utils';
import authAPI from 'api/authAPI';
import { RegisterRequestData, UserDTO } from 'api/types';
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
  action: LoginPayload,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

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
  action: RegisterPayload,
) => {
  dispatch({ isLoading: true });

  const payload: RegisterRequestData = {
    first_name: action.firstName,
    second_name: action.secondName,
    login: action.login,
    email: action.email,
    phone: action.phone,
    password: action.password,
  };

  const response = await authAPI.register(payload);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, registerFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, registerFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('/messenger');
};