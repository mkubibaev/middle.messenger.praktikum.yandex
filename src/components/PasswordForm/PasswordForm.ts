import { Block } from 'core';

export default class PasswordForm extends Block {
  render() {
    // language=hbs
    return `
      <form class="base-form">
        <h2 class="base-form__title">Изменить данные</h2>
      
        <div class="base-form__inputs">
          {{{Input
              label="Текущий пароль"
              name="oldPassword"
              type="password"
          }}}
          {{{Input
              label="Новый пароль"
              name="newPassword"
              type="password"
          }}}
          {{{Input
              label="Новый пароль еще раз"
              name="newPassword"
              type="password"
          }}}
        </div>
      
        <div class="base-form__actions">
          {{{Button
              label="Сохранить"
              type="submit"
              classes="base-form__submit btn--primary"
          }}}
        </div>
      </form>
    `;
  }
}
