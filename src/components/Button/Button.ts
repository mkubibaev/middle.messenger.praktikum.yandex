import { Block } from 'core';
import './Button.pcss';

type ButtonProps = {
  label: string;
  classes: string;
};

export default class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  render() {
    // language=hbs
    return `
      <button class="btn {{classes}}"
              type="{{#if type}}{{type}}{{else}}button{{/if}}"
      >{{label}}</button>
    `;
  }
}
