import type { Dispatch } from 'core';
import authAPI from 'api/authAPI';
import { UserDTO } from 'api/types';
import { apiHasError, transformUser } from 'utils';

export async function initApp(dispatch: Dispatch<AppState>) {
  dispatch({ isLoading: true });

  try {
    const response = await authAPI.me();
    if (apiHasError(response)) {
      return;
    }
    dispatch({ user: transformUser(response as UserDTO) });
    window.router.go('/messenger');
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ isLoading: false });
  }
}
