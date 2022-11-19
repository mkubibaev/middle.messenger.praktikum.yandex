import { Dispatch } from 'core';
import userAPI from 'api/userAPI';
import { PasswordData } from '../api/types';
import { apiHasError } from '../utils';

export const changePassword = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: PasswordData,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.changePassword(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, passwordFormError: response.reason });
    return;
  }

  dispatch({ isLoading: false, passwordFormError: null });
  window.router.go('/settings');
};
