import { Block, Store } from 'core';
import {
  readAndValidateForm,
  ValidationRule,
  withStore,
} from 'utils';
import { login } from 'services';

type LoginPageProps = {
  store: Store<AppState>;
  onLogin: (event: SubmitEvent) => void;
  formError: () => string | null;
  isLoading: () => boolean;
};

class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';

  constructor(props: LoginPageProps) {
    super({
      ...props,
      onLogin: (event) => {
        event.preventDefault();
        const [isValid, formValue] = readAndValidateForm(this.refs);
        if (isValid) {
          this.props.store.dispatch(login, formValue);
        }
      },
    });

    this.setProps({
      ...props,
      formError: () => props.store.getState().loginError,
      isLoading: () => props.store.getState().isLoading,
    });
  }

  render() {
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
          </div>
        </div>
      {{/Layout}}
    `;
  }
}

export default withStore(LoginPage);
