import { Block } from 'core';

export default class Register extends Block {
  render() {
    // language=hbs
    return `
      {{#AuthLayout}}
        {{{RegisterForm}}}
      {{/AuthLayout}}
    `;
  }
}
