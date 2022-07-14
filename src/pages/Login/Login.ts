import { Block, Router, Store } from 'core';
import { cloneDeep, validate, ValidationRule, withRouter, withStore } from 'utils';
import { login } from 'services';

type LoginPageProps = {
  router: Router;
  store: Store<AppState>;
  formError?: () => string | null;
};

class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';

  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      ...props,
      formError: () => props.store.getState().loginFormError,
    });
  }

  componentDidMount() {
    console.log('login page mounted');
    if (this.props.store.getState().user) {
      this.props.router.go('/messenger');
    }
  }

  getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      onLogin: (event: SubmitEvent) => {
        event.preventDefault();
        const formValid = this.validateForm();
        if (formValid) {
          const loginData = this.state.values;
          console.log(loginData);
          this.props.store.dispatch(login as Partial<AppState>, loginData);
        }
      },
      onInput: (event: InputEvent) => {
        const { name, value } = event.target as HTMLInputElement;
        const nextState = cloneDeep(this.state);
        nextState.values[name] = value;
      },
      onBlur: this.validateInput.bind(this),
    };
  }

  validateInput(event: FocusEvent) {
    const { name, value } = event.target as HTMLInputElement;
    const errorMsg = validate(name as ValidationRule, value);
    const nextState = cloneDeep(this.state);
    nextState.errors[name] = errorMsg;
    this.setState(nextState);
  }

  validateForm() {
    let formValid = true;
    Object.entries(this.state.values).forEach(([name, value]) => {
      const errorMsg = validate(name as ValidationRule, value as string);
      const nextState = cloneDeep(this.state);
      nextState.errors[name] = errorMsg;
      this.setState(nextState);
      formValid = formValid && !errorMsg;
    });
    return formValid;
  }

  render() {
    const { errors, values } = this.state;

    // language=hbs
    return `
      {{#AuthLayout}}
        {{#BaseForm
          title="Вход"      
          submitLabel="Войти"      
          onSubmit=onLogin
          linkLabel="Нет аккаунта?"
          linkUrl="/sign-up"
        }}
          {{#if formError}}
            {{{Alert
                type="danger"
                text=formError
            }}}    
          {{/if}}
          {{{FormControl
              label="Логин"
              name="login"
              value="${values.login}"
              error="${errors.login}"
              onInput=onInput
              onFocus=onFocus
              onBlur=onBlur
          }}}
          {{{FormControl
              label="Пароль"
              name="password"
              type="password"
              value="${values.password}"
              error="${errors.password}"
              onInput=onInput
              onFocus=onFocus
              onBlur=onBlur
          }}}
        {{/BaseForm}}    
      {{/AuthLayout}}
    `;
  }
}

export default withRouter(withStore(LoginPage));
