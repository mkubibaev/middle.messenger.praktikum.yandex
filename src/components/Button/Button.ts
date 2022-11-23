import { Block } from 'core';
import './Button.scss';

type ButtonProps = {
  label: string;
  classes: string;
  disabled: boolean;
  onClick?: (e: PointerEvent) => void,
  events?: {
    click?: (e: PointerEvent) => void,
  }
};

export default class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor({ onClick, ...props }: ButtonProps) {
    super({
      ...props,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    // language=hbs
    return `
      <button class="btn {{classes}}"
              type="{{#if type}}{{type}}{{else}}button{{/if}}"
              {{#if disabled}}disabled{{/if}}
      >
        {{label}}
        <span data-layout="${this.id}"></span>
      </button>
    `;
  }
}
