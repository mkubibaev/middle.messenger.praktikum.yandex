import { Block, Store } from 'core';
import {
  readAndValidateForm,
  ValidationRule,
  withStore,
} from 'utils';
import { login as loginAction } from 'services';

type LoginPageProps = {
  store: Store<AppState>;
  formError: () => string | null;
};

class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';

  constructor(props: LoginPageProps) {
    super({
      ...props,
      formError: () => props.store.getState().loginFormError,
    });
  }

  getStateFromProps() {
    this.state = {
      formValue: {
        login: '',
        password: '',
      },
      onLogin: (event: SubmitEvent) => this.onLogin(event),
    };
  }

  onLogin(event: SubmitEvent) {
    event.preventDefault();
    const [isValid, formValue] = readAndValidateForm(this.refs);
    if (isValid) {
      this.setState({ formValue });
      this.props.store.dispatch(loginAction, formValue);
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
                title="Вход"
                submitLabel="Войти"
                onSubmit=onLogin
                isLoading=isLoading
                linkLabel="Нет аккаунта?"
                linkUrl="/sign-up"
            }}
              {{#if formError}}
                  {{{Alert type="danger" text=formError}}}
              {{/if}}
              {{{ControlledInput
                  label="Логин"
                  name="login"
                  ref="login"
                  value="${formValue.login}"
                  validationRule="${ValidationRule.Required}"
              }}}
              {{{ControlledInput
                  label="Пароль"
                  name="password"
                  type="password"
                  ref="password"
                  value="${formValue.password}"
                  validationRule="${ValidationRule.Required}"
              }}}
            {{/BaseForm}}
          </div>
        </div>
      {{/Layout}}
    `;
  }
}

export default withStore(LoginPage);
