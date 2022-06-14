import { registerComponent, renderDOM } from 'core';
import { ProfileChangeData } from 'pages';
import * as Components from 'components';
import { BlockConstructable } from './core/registerComponent';
import './styles/main.pcss';

Object.values(Components).forEach((Component) => {
  registerComponent(Component as BlockConstructable, new Component({}).componentName);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ProfileChangeData({}));
});
