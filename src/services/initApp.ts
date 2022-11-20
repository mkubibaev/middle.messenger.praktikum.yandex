import type { Dispatch } from 'core';
import authAPI from 'api/authAPI';
import { apiHasError, transformUser } from 'utils';
import { UserDTO } from 'api/types';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const userResponse = await authAPI.getUser();
    if (apiHasError(userResponse)) {
      return;
    }
    dispatch({ user: transformUser(userResponse as UserDTO) });
    // window.router.go('/messenger');
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
