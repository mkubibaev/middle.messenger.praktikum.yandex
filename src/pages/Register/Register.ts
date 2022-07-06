import { Block } from 'core';
import { validateValue, ValidationRule } from 'helpers/validator';

interface RegisterProps {}

export default class Register extends Block<RegisterProps> {
  constructor(props: RegisterProps) {
    super(props);

    this.setProps({
      onRegister: this.onRegister.bind(this),
    });
  }

  onRegister(event: SubmitEvent) {
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
      {{#AuthLayout}}
        {{#BaseForm
          title="Регистрация"      
          submitLabel="Зарегистрироваться"
          onSubmit=onRegister
          linkLabel="Войти"
          linkUrl="./login.html"
        }}
          {{{ControlledInput
              label="Имя"
              name="first_name"
              ref="first_name"
              validationRule="${ValidationRule.Name}"
          }}}
          {{{ControlledInput
              label="Фамилия"
              name="second_name"
              ref="second_name"
              validationRule="${ValidationRule.Name}"
          }}}
          {{{ControlledInput
              label="Почта"
              name="email"
              ref="email"
              validationRule="${ValidationRule.Email}"
          }}}
          {{{ControlledInput
              label="Телефон"
              name="phone"
              ref="phone"
              validationRule="${ValidationRule.Phone}"
          }}}
          {{{ControlledInput
              label="Логин"
              name="login"
              ref="login"
              validationRule="${ValidationRule.Login}"
          }}}
          {{{ControlledInput
              label="Пароль"
              name="password"
              type="password"
              ref="password"
              validationRule="${ValidationRule.Password}"
          }}}
        {{/BaseForm}}
      {{/AuthLayout}}
    `;
  }
}
