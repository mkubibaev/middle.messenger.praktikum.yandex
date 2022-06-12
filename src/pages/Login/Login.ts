import { Block } from 'core';
import './Login.pcss';

export default class Login extends Block {
  render() {
    // language=hbs
    return `
      {{#AuthLayout}}
        {{{LoginForm}}}
      {{/AuthLayout}}
    `;
  }
}
