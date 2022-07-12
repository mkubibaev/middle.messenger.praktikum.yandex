import { Block } from 'core';
import './InputError.pcss';

type InputErrorProps = {
  text: string;
};

export default class InputError extends Block<InputErrorProps> {
  static componentName = 'InputError';

  render() {
    // language=hbs
    return `
      <div class="form-control__error"><small>{{text}}</small></div>
    `;
  }
}
