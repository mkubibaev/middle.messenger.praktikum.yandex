import type { Dispatch } from 'core';
import { authAPI, UserDTO } from 'api';
import { apiHasError, transformUser } from 'utils';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const userResponse = await authAPI.getUser();
    if (apiHasError(userResponse.data)) {
      return;
    }
    dispatch({ user: transformUser(userResponse.data as UserDTO) });
    window.router.go('/messenger');
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
