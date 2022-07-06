import { registerComponent, renderDOM } from 'core';
import { ErrorPage } from 'pages';
import { BlockConstructable } from 'core/registerComponent';
import * as Components from './components';
import './styles/main.pcss';

Object.values(Components).forEach((Component) => {
  registerComponent(Component as BlockConstructable, new Component({}).componentName);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ErrorPage({ code: 404, message: 'Не туда попали' }));
});
