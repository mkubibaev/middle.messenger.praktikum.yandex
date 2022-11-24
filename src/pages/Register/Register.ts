import { Block, Store } from 'core';
import { readAndValidateForm, ValidationRule, withStore } from 'utils';
import { register } from 'services';

type RegisterPageProps = {
  store: Store<AppState>;
  formError: () => string | null;
};

class RegisterPage extends Block<RegisterPageProps> {
  static componentName = 'RegisterPage';

  constructor(props: RegisterPageProps) {
    super({
      ...props,
      formError: () => props.store.getState().registerFormError,
    });
  }

  getStateFromProps() {
    this.state = {
      formValue: {
        firstName: '',
        secondName: '',
        login: '',
        email: '',
        phone: '',
        password: '',
      },
      onRegister: (event: SubmitEvent) => this.onRegister(event),
    };
  }

  onRegister(event: SubmitEvent) {
    event.preventDefault();
    const [isValid, formValue] = readAndValidateForm(this.refs);
    if (isValid) {
      this.setState(formValue);
      this.props.store.dispatch(register, formValue);
    }
  }

  render() {
    const { formValue } = this.state;

    // language=hbs
    return `
      {{#Layout}}
        <div class="auth__container container">
          <div class="auth__inner">
            {{#BaseForm
              title="Регистрация"      
              submitLabel="Зарегистрироваться"
              onSubmit=onRegister
              isLoading=isLoading
              linkLabel="Войти"
              linkUrl="/"
            }}
              {{#if formError}}
                {{{Alert type="danger" text=formError}}}
              {{/if}}  
              
              {{{ControlledInput
                  label="Имя"
                  name="firstName"
                  ref="firstName"
                  value="${formValue.firstName}"
                  validationRule="${ValidationRule.Name}"
              }}}
              {{{ControlledInput
                  label="Фамилия"
                  name="secondName"
                  ref="secondName"
                  value="${formValue.secondName}"
                  validationRule="${ValidationRule.Name}"
              }}}
              {{{ControlledInput
                  label="Логин"
                  name="login"
                  ref="login"
                  value="${formValue.login}"
                  validationRule="${ValidationRule.Login}"
              }}}
              {{{ControlledInput
                  label="Почта"
                  name="email"
                  type="email"
                  ref="email"
                  value="${formValue.email}"
                  validationRule="${ValidationRule.Email}"
              }}}
              {{{ControlledInput
                  label="Телефон"
                  name="phone"
                  ref="phone"
                  value="${formValue.phone}"
                  validationRule="${ValidationRule.Phone}"
              }}}
              {{{ControlledInput
                  label="Пароль"
                  name="password"
                  type="password"
                  ref="password"
                  validationRule="${ValidationRule.Password}"
              }}}
            {{/BaseForm}}
          </div>
        </div>
        {{#if isLoading}}
            {{{Loader}}}
        {{/if}}  
      {{/Layout}}
    `;
  }
}

export default withStore(RegisterPage);
