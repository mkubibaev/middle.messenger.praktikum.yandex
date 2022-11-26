import { Dispatch, DispatchStateHandler } from 'core';
import { apiHasError, transformToRegisterDTO, transformUser } from 'utils';
import { authAPI, UserDTO } from 'api';
import { LoginPayload, RegisterPayload } from './types';

export const logout = async (dispatch: Dispatch<AppState>) => {
  try {
    dispatch({ isLoading: true });

    await authAPI.logout();
    dispatch({ isLoading: false, user: null });

    window.router.go('/');
  } catch (err) {
    console.log(err);
  }
};

export const login: DispatchStateHandler<LoginPayload> = async (
  dispatch,
  _state,
  payload,
) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const register: DispatchStateHandler<RegisterPayload> = async (
  dispatch,
  _state,
  payload,
) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};
