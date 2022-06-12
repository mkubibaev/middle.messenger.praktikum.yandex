import { registerComponent, renderDOM } from 'core';
import { BlockConstructable } from './core/registerComponent';

import './styles/main.pcss';
import * as components from './components';
import { Error } from './pages';

Object.values(components).forEach((component) => {
  registerComponent(component as BlockConstructable);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Error({ code: 404, message: 'Не туда попали' }));
});
