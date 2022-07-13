import { Block, Router, Store } from 'core';
import { withRouter, withStore, ValidationRule } from 'utils';

type LoginPageProps = {
  router: Router;
  store: Store<AppState>;
  onLogin: (event: SubmitEvent) => void;
  validationRule: ValidationRule
};

class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';

  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      ...props,
      onLogin: this.onLogin,
    });
  }

  componentDidMount() {
    if (this.props.store.getState().user) {
      this.props.router.go('/messenger');
    }
  }

  onLogin = (event: SubmitEvent) => {
    event.preventDefault();
    this.props.router.go('/messenger');
    // const formValue: { [key: string]: string } = {};
    // Object.values(this.refs).forEach((component: Block<LoginPageProps>) => {
    //   const { validationRule } = component.props;
    //   if (validationRule) {
    //     const input = component.refs.input.getContent() as HTMLInputElement;
    //     const { name, value } = input;
    //     formValue[name] = value;
    //     const errorText = validateValue(validationRule, value);
    //     component.refs.error.setProps({ text: errorText });
    //   }
    // });
  };

  render() {
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

export default withRouter(withStore(LoginPage));
