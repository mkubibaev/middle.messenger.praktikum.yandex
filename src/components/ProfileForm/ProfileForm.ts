import { Block } from 'core';

export default class ProfileForm extends Block {
  render() {
    // language=hbs
    return `
      <form class="base-form">
        <h2 class="base-form__title">Изменить данные</h2>
      
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
              label="Имя в чате"
              name="display_name"
          }}}
          {{{Input
              label="Почта"
              name="email"
          }}}
          {{{Input
              label="Телефон"
              name="phone"
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
