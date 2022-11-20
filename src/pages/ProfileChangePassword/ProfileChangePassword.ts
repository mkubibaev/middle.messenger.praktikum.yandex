import { Block, Store } from 'core';
import { readAndValidateForm, ValidationRule, withStore } from 'utils';
import { changePassword } from '../../services/user';

type ProfileChangePasswordProps = {
  store: Store<AppState>;
  formError: () => string | null;
  onSave: (event: SubmitEvent) => void;
};

class ProfileChangePasswordPage extends Block<ProfileChangePasswordProps> {
  static componentName = 'ProfileChangePassword';

  constructor(props: ProfileChangePasswordProps) {
    super({
      ...props,
      onSave: (event) => this.onSave(event),
    });

    this.setProps({
      ...props,
      formError: () => this.props.store.getState().passwordFormError,
    });
  }

  onSave(event: SubmitEvent) {
    event.preventDefault();
    const [isValid, formValue] = readAndValidateForm(this.refs);
    if (isValid) {
      this.props.store.dispatch(changePassword, formValue);
    }
  }

  render() {
    // language=hbs
    return `
      {{#Layout}}
        {{#ProfileWrapper}}
          {{#BaseForm
              title="Изменить пароль"
              submitLabel="Сохранить"
              onSubmit=onSave
          }}
            {{#if formError}}
              {{{Alert type="danger" text=formError}}}
            {{/if}}
            {{{ControlledInput
                label="Текущий пароль"
                name="oldPassword"
                ref="oldPassword"
                type="password"
                validationRule="${ValidationRule.Required}"
            }}}
            {{{ControlledInput
                label="Новый пароль"
                name="newPassword"
                ref="newPassword"
                type="password"
                validationRule="${ValidationRule.Password}"
            }}}
          {{/BaseForm}}
        {{/ProfileWrapper}}
      {{/Layout}}  
    `;
  }
}

export default withStore(ProfileChangePasswordPage);
