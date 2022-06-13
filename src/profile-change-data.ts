import { registerComponent, renderDOM } from 'core';
import { ProfileChangeData } from 'pages';
import * as components from 'components';
import { BlockConstructable } from './core/registerComponent';
import './styles/main.pcss';

Object.values(components).forEach((component) => {
  registerComponent(component as BlockConstructable);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ProfileChangeData({}));
});
