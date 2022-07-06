import { Block } from 'core';
import { validateValue, ValidationRule } from 'helpers/validator';
import { user } from 'helpers/mockData';

interface ProfileChangeDataProps {}

export default class ProfileChangeData extends Block {
  constructor(props: ProfileChangeDataProps) {
    super({
      ...props,
      user,
    });

    this.setProps({
      onSave: this.onSave.bind(this),
    });
  }

  onSave(event: SubmitEvent) {
    event.preventDefault();
    const formValue: { [key: string]: string } = {};
    Object.values(this.refs).forEach((component: Block) => {
      const { validationRule } = component.props;
      if (validationRule) {
        const input = component.refs.input.getContent() as HTMLInputElement;
        const { name, value } = input;
        formValue[name] = value;
        const errorText = validateValue(validationRule, value);
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
            title="Изменить данные"
            submitLabel="Сохранить"
            onSubmit=onSave
        }}
          {{{ControlledInput
              label="Имя"
              name="first_name"
              ref="first_name"
              value=user.first_name
              validationRule="${ValidationRule.Name}"
          }}}
          {{{ControlledInput
              label="Фамилия"
              name="second_name"
              ref="second_name"
              value=user.second_name
              validationRule="${ValidationRule.Name}"
          }}}
          {{{ControlledInput
              label="Почта"
              name="email"
              ref="email"
              value=user.email
              validationRule="${ValidationRule.Email}"
          }}}
          {{{ControlledInput
              label="Телефон"
              name="phone"
              ref="phone"
              value=user.phone
              validationRule="${ValidationRule.Phone}"
          }}}
          {{{ControlledInput
              label="Логин"
              name="login"
              ref="login"
              value=user.login
              validationRule="${ValidationRule.Login}"
          }}}
        {{/BaseForm}}  
      {{/ProfileLayout}}
    `;
  }
}
