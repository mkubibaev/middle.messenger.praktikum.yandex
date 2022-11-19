import { Block, Store } from 'core';
import { readAndValidateForm, ValidationRule, withStore } from 'utils';
import { register } from 'services';

type RegisterPageProps = {
  store: Store<AppState>;
  onRegister: (event: SubmitEvent) => void;
  formError: () => string | null;
  isLoading: () => boolean;
};

class RegisterPage extends Block<RegisterPageProps> {
  static componentName = 'RegisterPage';

  constructor(props: RegisterPageProps) {
    super({
      ...props,
      onRegister: (event) => {
        event.preventDefault();
        const [isValid, formValue] = readAndValidateForm(this.refs);
        if (isValid) {
          this.props.store.dispatch(register, formValue);
        }
      },
    });

    this.setProps({
      ...props,
      formError: () => props.store.getState().registerError,
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
                  validationRule="${ValidationRule.Name}"
              }}}
              {{{ControlledInput
                  label="Фамилия"
                  name="secondName"
                  ref="secondName"
                  validationRule="${ValidationRule.Name}"
              }}}
              {{{ControlledInput
                  label="Логин"
                  name="login"
                  ref="login"
                  validationRule="${ValidationRule.Login}"
              }}}
              {{{ControlledInput
                  label="Почта"
                  name="email"
                  type="email"
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
                  label="Пароль"
                  name="password"
                  type="password"
                  ref="password"
                  validationRule="${ValidationRule.Password}"
              }}}
            {{/BaseForm}}
          </div>
        </div>  
      {{/Layout}}
    `;
  }
}

export default withStore(RegisterPage);
