import { Block } from 'core';
import './Button.scss';

type ButtonProps = {
  label: string;
  classes: string;
  disabled: boolean;
};

export default class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  render() {
    // language=hbs
    return `
      <button class="btn {{classes}}"
              type="{{#if type}}{{type}}{{else}}button{{/if}}"
              {{#if disabled}}disabled{{/if}}
      >{{label}}</button>
    `;
  }
}
