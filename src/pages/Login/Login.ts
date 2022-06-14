import { Block } from 'core';
import { validateValue, ValidationRule } from 'helpers/validator';

interface LoginProps {}

export default class Login extends Block<LoginProps> {
  constructor(props: LoginProps) {
    super(props);

    this.setProps({
      onLogin: this.onLogin.bind(this),
    });
  }

  onLogin(event: SubmitEvent) {
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
          title="Вход"      
          submitLabel="Войти"      
          onSubmit=onLogin
          linkLabel="Нет аккаунта?"
          linkUrl="./register.html"
        }}
          {{{ControlledInput
              label="Логин"
              name="login"
              ref="login"
              validationRule="${ValidationRule.Required}"
          }}}
          {{{ControlledInput
              label="Пароль"
              name="password"
              type="password"
              ref="password"
              validationRule="${ValidationRule.Required}"
          }}}
        {{/BaseForm}}    
      {{/AuthLayout}}
    `;
  }
}
