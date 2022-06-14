import { registerComponent, renderDOM } from 'core';
import { Chats } from 'pages';
import * as Components from 'components';
import './styles/main.pcss';
import { BlockConstructable } from './core/registerComponent';

Object.values(Components).forEach((Component) => {
  registerComponent(Component as BlockConstructable, new Component({}).componentName);
});

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Chats({}));
});
