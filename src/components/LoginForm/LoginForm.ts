import { Block } from 'core';

export default class LoginForm extends Block {
  render() {
    // language=hbs
    return `
      <form class="base-form">
        <h2 class="base-form__title">Вход</h2>
      
        <div class="base-form__inputs">
          {{{Input
              label="Логин"
              name="login"
          }}}
          {{{Input
              label="Пароль"
              name="password"
              type="password"
          }}}
        </div>
      
        <div class="base-form__actions">
          {{{Button
              label="Войти"
              type="submit"
              classes="base-form__submit btn--primary"
          }}}
          {{{Link 
              label="Нет аккаунта?"
              to="./register.html"
              classes="base-form__link"
          }}}
        </div>
      </form>
    `;
  }
}
