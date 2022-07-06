import { Block } from 'core';
import './Input.pcss';

interface InputProps {
  name: string;
  value?: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  classes?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onInput?: () => void;
}

export default class Input extends Block {
  constructor({ onFocus, onBlur, onInput, ...props }: InputProps) {
    super({
      ...props,
      events: {
        focus: onFocus,
        blur: onBlur,
        input: onInput,
      },
    });
  }

  get componentName(): string {
    return 'Input';
  }

  render() {
    // language=hbs
    return `
      <input type="{{#if type}}{{type}}{{else}}text{{/if}}"
             name="{{name}}"
             id="{{name}}"
             value="{{value}}"
             class="form-control__input {{classes}}"
             {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
      >
    `;
  }
}
