import { Block } from 'core';
import './Input.pcss';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  classes?: string;
}

export default class Input extends Block<InputProps> {
  render() {
    // language=hbs
    return `
      <div class="form-control">
        <label class="form-control__label" for="{{name}}">{{label}}</label>
        <input class="form-control__input {{classes}}"
               type="{{#if type}}{{type}}{{else}}text{{/if}}"
               name="{{name}}"
               id="{{name}}"
               {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
        >
      </div>
    `;
  }
}
