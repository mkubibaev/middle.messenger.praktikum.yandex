import { Block, Router } from 'core';
import './ProfileWrapper.scss';
import { withRouter } from '../../utils';

type ProfileWrapperProps = {
  router: Router;
  navigateToChangeData: () => void;
  navigateToChangePassword: () => void;
};

class ProfileWrapper extends Block<ProfileWrapperProps> {
  static componentName = 'ProfileWrapper';

  constructor(props: ProfileWrapperProps) {
    super(props);
    this.setProps({
      ...props,
      navigateToChangeData: () => this.props.router.go('/settings/change-data'),
      navigateToChangePassword: () => this.props.router.go('/settings/change-password'),
    });
  }

  render() {
    // language=hbs
    return `
    {{#AppLayout wrapClassName="profile"}}
      <main class="profile__container container">
        <div class="profile__inner">
          <div class="profile__inner-left">
            <div class="profile__avatar">
              <img class="profile__avatar-img" src="" alt="">
            </div>
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
                    onClick=navigateToChangePassword
                }}}
              </li>
            </ul>
          </div>
          <div class="profile__inner-right" data-layout="${this.id}"></div>
        </div>
      </main>
      {{/AppLayout}}
    `;
  }
}

export default withRouter(ProfileWrapper);
