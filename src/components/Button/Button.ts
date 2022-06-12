import { Block } from 'core';
import './Button.pcss';

interface ButtonProps {
  label: string;
  classes: string;
}

export default class Button extends Block<ButtonProps> {
  render() {
    // language=hbs
    return `
      <button class="btn {{classes}}"
              type="{{#if type}}{{type}}{{else}}button{{/if}}"
      >{{label}}</button>
    `;
  }
}
