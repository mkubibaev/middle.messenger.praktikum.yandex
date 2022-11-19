import { Block } from 'core';
import './FormControl.scss';

type FormControlProps = {
  label: string;
  name: string;
  value?: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  error?: string;
  classes?: string;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onInput?: (e: InputEvent) => void;
};

export default class FormControl extends Block<FormControlProps> {
  static componentName = 'FormControl';

  render() {
    // language=hbs
    return `
      <div class="form-control">
        <label class="form-control__label" for="{{name}}">{{label}}</label>
        {{{Input
            name=name
            type=type
            value=value
            placeholder=placeholder
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{#if error}}<div class="form-control__error"><small>{{error}}</small></div>{{/if}}
      </div>
    `;
  }
}
