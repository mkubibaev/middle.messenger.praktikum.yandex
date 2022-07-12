import { Block } from 'core';
import './Input.pcss';

type InputProps = {
  name: string;
  value?: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  classes?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onInput?: () => void;
  events?: {
    blur?: (e: FocusEvent) => void;
    focus?: (e: FocusEvent) => void;
    input?: () => void;
  }
};

export default class Input extends Block<InputProps> {
  static componentName = 'Input';

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
