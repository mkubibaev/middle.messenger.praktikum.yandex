import { Block, Router } from 'core';
import { validate, ValidationRule, withRouter } from 'utils';

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
    const formValue: { [key: string]: string } = {};
    Object.values(this.refs).forEach((component: Block<any>) => {
      const { validationRule } = component.props;
      if (validationRule) {
        const input = component.refs.input.getContent() as HTMLInputElement;
        const { name, value } = input;
        formValue[name] = value;
        const errorText = validate(validationRule, value);
        component.refs.error.setProps({ text: errorText });
      }
    });
    console.log(formValue);
  }

  render() {
    // language=hbs
    return `
      {{#ProfileLayout}}
        {{#BaseForm
            title="Изменить пароль"
            submitLabel="Сохранить"
            onSubmit=onSave
        }}
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
      {{/ProfileLayout}}
    `;
  }
}

export default withRouter(ProfileChangePasswordPage);
