import { Block } from 'core';
import './InputError.pcss';

interface InputErrorProps {
  text: string;
}

export default class InputError extends Block<InputErrorProps> {
  render() {
    // language=hbs
    return `
      <div class="form-control__error"><small>{{text}}</small></div>
    `;
  }
}
