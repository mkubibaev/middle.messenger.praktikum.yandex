import { Block, Router } from 'core';
import { validateValue, ValidationRule } from 'utils/validator';
import { withRouter } from '../../utils';

interface ProfileChangeDataProps {
  router: Router;
  user: User;
  onSave: (event: SubmitEvent) => void;
}

class ProfileChangeDataPage extends Block<ProfileChangeDataProps> {
  static componentName = 'ProfileChangeData';

  constructor(props: ProfileChangeDataProps) {
    super({
      ...props,
      user: {} as User,
    });

    this.setProps({
      ...props,
      onSave: this.onSave.bind(this),
    });
  }

  onSave(event: SubmitEvent) {
    event.preventDefault();
    const formValue: { [key: string]: string } = {};
    // Object.values(this.refs).forEach((component: Block<any>) => {
    //   const { validationRule } = component.props;
    //   if (validationRule) {
    //     const input = component.refs.input.getContent() as HTMLInputElement;
    //     const { name, value } = input;
    //     formValue[name] = value;
    //     const errorText = validate(validationRule, value);
    //     component.refs.error.setProps({ text: errorText });
    //   }
    // });
    console.log(formValue);
  }

  render() {
    // language=hbs
    return `
      <div>Profile change data</div>
    `;

    // return `
    //   {{#ProfileLayout}}
    //     {{#BaseForm
    //         title="Изменить данные"
    //         submitLabel="Сохранить"
    //         onSubmit=onSave
    //     }}
    //       {{{ControlledInput
    //           label="Имя"
    //           name="first_name"
    //           ref="first_name"
    //           value=user.first_name
    //           validationRule="${ValidationRule.FirstName}"
    //       }}}
    //       {{{ControlledInput
    //           label="Фамилия"
    //           name="second_name"
    //           ref="second_name"
    //           value=user.second_name
    //           validationRule="${ValidationRule.SecondName}"
    //       }}}
    //       {{{ControlledInput
    //           label="Почта"
    //           name="email"
    //           ref="email"
    //           value=user.email
    //           validationRule="${ValidationRule.Email}"
    //       }}}
    //       {{{ControlledInput
    //           label="Телефон"
    //           name="phone"
    //           ref="phone"
    //           value=user.phone
    //           validationRule="${ValidationRule.Phone}"
    //       }}}
    //       {{{ControlledInput
    //           label="Логин"
    //           name="login"
    //           ref="login"
    //           value=user.login
    //           validationRule="${ValidationRule.Login}"
    //       }}}
    //     {{/BaseForm}}
    //   {{/ProfileLayout}}
    // `;
  }
}

export default withRouter(ProfileChangeDataPage);
