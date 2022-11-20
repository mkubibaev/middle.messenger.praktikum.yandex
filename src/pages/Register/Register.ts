import { Block, Store } from 'core';
import { readAndValidateForm, ValidationRule, withStore } from 'utils';
import { register } from 'services';

type RegisterPageProps = {
  store: Store<AppState>;
  onRegister: (event: SubmitEvent) => void;
  formError: () => string | null;
};

class RegisterPage extends Block<RegisterPageProps> {
  static componentName = 'RegisterPage';

  constructor(props: RegisterPageProps) {
    super({
      ...props,
      onRegister: (event) => this.onRegister(event),
    });

    this.setProps({
      ...props,
      formError: () => props.store.getState().registerFormError,
    });
  }

  getStateFromProps() {
    this.state = {
      firstName: '',
      secondName: '',
      login: '',
      email: '',
      phone: '',
      password: '',
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
    const {
      firstName,
      secondName,
      login,
      email,
      phone,
    } = this.state;

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
                  value="${firstName}"
                  validationRule="${ValidationRule.Name}"
              }}}
              {{{ControlledInput
                  label="Фамилия"
                  name="secondName"
                  ref="secondName"
                  value="${secondName}"
                  validationRule="${ValidationRule.Name}"
              }}}
              {{{ControlledInput
                  label="Логин"
                  name="login"
                  ref="login"
                  value="${login}"
                  validationRule="${ValidationRule.Login}"
              }}}
              {{{ControlledInput
                  label="Почта"
                  name="email"
                  type="email"
                  ref="email"
                  value="${email}"
                  validationRule="${ValidationRule.Email}"
              }}}
              {{{ControlledInput
                  label="Телефон"
                  name="phone"
                  ref="phone"
                  value="${phone}"
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
