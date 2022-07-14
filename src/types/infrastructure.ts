import { Dispatch } from 'core';

export type NavLink = {
  label: string;
  path: string;
  action?: (dispatch: Dispatch<AppState>) => Promise<void>;
};
