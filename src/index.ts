import { BlockConstructable, registerComponent, Router, Store } from 'core';
import * as Components from 'components';
import './styles/main.scss';
import { getPageComponent, Pages } from 'utils';
import { defaultState } from './store';
import { initApp } from './services';

Object.values(Components).forEach((Component) => {
  registerComponent(Component as BlockConstructable, Component.componentName);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.router = router;
  window.store = store;

  router
    .use('/', getPageComponent(Pages.Login))
    .use('/sign-up', getPageComponent(Pages.Register))
    .use('/messenger', getPageComponent(Pages.Chats))
    .use('/settings', getPageComponent(Pages.Profile))
    .use('/settings/change-data', getPageComponent(Pages.ProfileChangeData))
    .use('/settings/change-password', getPageComponent(Pages.ProfileChangePassword))
    .use('/error', getPageComponent(Pages.Error))
    .use('*', getPageComponent(Pages.Error404))
    .start();

  setTimeout(() => {
    store.dispatch(initApp);
  }, 100);
});
