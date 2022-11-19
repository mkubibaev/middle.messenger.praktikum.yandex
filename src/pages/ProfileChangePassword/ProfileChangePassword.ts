import { Block, Router } from 'core';
import { ValidationRule, withRouter } from 'utils';

type ProfileChangePasswordProps = {
  router: Router;
  onSave: (event: SubmitEvent) => void;
};

class ProfileChangePasswordPage extends Block<ProfileChangePasswordProps> {
  static componentName = 'ProfileChangePassword';

  constructor(props: ProfileChangePasswordProps) {
    super({
      ...props,
    });

    this.setProps({
      ...props,
      onSave: this.onSave.bind(this),
    });
  }

  onSave(event: SubmitEvent) {
    event.preventDefault();
  }

  render() {
    // language=hbs
    return `
        <div>Change password</div>
    `;
    // return `
    //   {{#ProfileLayout}}
    //     {{#BaseForm
    //         title="Изменить пароль"
    //         submitLabel="Сохранить"
    //         onSubmit=onSave
    //     }}
    //         {{{ControlledInput
    //             label="Текущий пароль"
    //             name="oldPassword"
    //             ref="oldPassword"
    //             type="password"
    //             validationRule="${ValidationRule.Required}"
    //         }}}
    //         {{{ControlledInput
    //             label="Новый пароль"
    //             name="newPassword"
    //             ref="newPassword"
    //             type="password"
    //             validationRule="${ValidationRule.Password}"
    //         }}}
    //     {{/BaseForm}}
    //   {{/ProfileLayout}}
    // `;
  }
}

export default withRouter(ProfileChangePasswordPage);
