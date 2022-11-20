import { Block } from 'core';
import './ProfileWrapper.scss';

type ProfileWrapperProps = {};

export default class ProfileWrapper extends Block<ProfileWrapperProps> {
  static componentName = 'ProfileWrapper';

  render() {
    // language=hbs
    return `
      <div class="profile__container container">
        <div class="profile__inner">
          <div class="profile__inner-left">
            {{{ProfileAvatar}}}
            <ul class="profile__links">
              <li>
                {{{Link
                    to="/settings/change-data"
                    label="Изменить данные"
                    classes="profile__link"
                }}}
              </li>
              <li>
                {{{Link
                    to="/settings/change-password"
                    label="Изменить пароль"
                    classes="profile__link"
                }}}
              </li>
            </ul>
          </div>
          <div class="profile__inner-right" data-layout="${this.id}"></div>
        </div>
      </div>
    `;
  }
}
