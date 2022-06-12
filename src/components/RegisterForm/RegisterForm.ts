import { Block } from 'core';

export default class RegisterForm extends Block {
  render() {
    // language=hbs
    return `
      <form class="base-form">
        <h2 class="base-form__title">Регистрация</h2>
      
        <div class="base-form__inputs">
          {{{Input
              label="Имя"
              name="first_name"
          }}}
          {{{Input
              label="Фамилия"
              name="second_name"
          }}}
          {{{Input
              label="Почта"
              name="email"
          }}}
          {{{Input
              label="Телефон"
              name="phone"
          }}}
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
              label="Зарегистрироваться"
              type="submit"
              classes="base-form__submit btn--primary"
          }}}
          {{{Link 
              label="Войти"
              to="./login.html"
              classes="base-form__link"
          }}}
        </div>
      </form>
    `;
  }
}
