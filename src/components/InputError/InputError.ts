import { Block } from 'core';
import './InputError.pcss';

interface InputErrorProps {
  text: string;
}

export default class InputError extends Block<InputErrorProps> {
  get componentName(): string {
    return 'InputError';
  }

  render() {
    // language=hbs
    return `
      <div class="form-control__error"><small>{{text}}</small></div>
    `;
  }
}
