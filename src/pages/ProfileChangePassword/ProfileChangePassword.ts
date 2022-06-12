import { Block } from 'core';

export default class ProfileChangePassword extends Block {
  render() {
    // language=hbs
    return `
      {{#ProfileLayout}}
        {{{PasswordForm}}}
      {{/ProfileLayout}}
    `
  }
}
