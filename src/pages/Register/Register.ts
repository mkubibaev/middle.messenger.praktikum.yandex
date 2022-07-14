import { Block, Router, Store } from 'core';
import { withRouter, validate, ValidationRule, withStore, cloneDeep } from 'utils';
import { register } from 'services';

type RegisterPageProps = {
  router: Router
  store: Store<AppState>;
  formError?: () => string | null;
};

class RegisterPage extends Block<RegisterPageProps> {
  static componentName = 'RegisterPage';

  constructor(props: RegisterPageProps) {
    super(props);

    this.setProps({
      ...props,
      formError: () => props.store.getState().registerFormError,
    });
  }

  componentDidMount() {
    if (this.props.store.getState().user) {
      this.props.router.go('/messenger');
    }
  }

  getStateFromProps() {
    this.state = {
      values: {
        firstName: '',
        secondName: '',
        login: '',
        email: '',
        password: '',
        phone: '',
      },
      errors: {
        firstName: '',
        secondName: '',
        login: '',
        email: '',
        password: '',
        phone: '',
      },
      onRegister: (event: SubmitEvent) => {
        event.preventDefault();
        const formValid = this.validateForm();
        if (formValid) {
          const loginData = this.state.values;
          this.props.store.dispatch(register as Partial<AppState>, loginData);
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
          title="Регистрация"      
          submitLabel="Зарегистрироваться"
          onSubmit=onRegister
          linkLabel="Войти"
          linkUrl="/"
        }}
          {{#if formError}}
            {{{Alert
                type="danger"
                text=formError
            }}}
          {{/if}}  
          {{{FormControl
              label="Имя"
              name="firstName"
              value="${values.firstName}"
              error="${errors.firstName}"
              onInput=onInput
              onFocus=onFocus
              onBlur=onBlur
          }}}
          {{{FormControl
              label="Фамилия"
              name="secondName"
              value="${values.secondName}"
              error="${errors.secondName}"
              onInput=onInput
              onFocus=onFocus
              onBlur=onBlur
          }}}
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
              label="Почта"
              name="email"
              value="${values.email}"
              error="${errors.email}"
              onInput=onInput
              onFocus=onFocus
              onBlur=onBlur
          }}}
          {{{FormControl
              label="Телефон"
              name="phone"
              value="${values.phone}"
              error="${errors.phone}"
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

export default withRouter(withStore(RegisterPage));
