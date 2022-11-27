import { Block, Router, Store } from 'core';
import { readAndValidateForm, ValidationRule } from 'utils/validator';
import { withStore } from 'utils';
import { changeProfile } from 'services';

interface ProfileChangeDataProps {
  router: Router;
  store: Store<AppState>;
  user: () => User | null;
  formError: () => string | null;
  onSave: (event: SubmitEvent) => void;
}

class ProfileChangeDataPage extends Block<ProfileChangeDataProps> {
  static componentName = 'ProfileChangeData';

  constructor(props: ProfileChangeDataProps) {
    super({
      ...props,
      onSave: (event) => this.onSave(event),
    });

    this.setProps({
      ...props,
      user: () => props.store.getState().user,
      formError: () => props.store.getState().profileFormError,
    });
  }

  onSave(event: SubmitEvent) {
    event.preventDefault();
    const [isValid, formValue] = readAndValidateForm(this.refs);
    if (isValid) {
      this.props.store.dispatch(changeProfile, formValue);
    }
  }

  render() {
    // language=hbs
    return `
      {{#Layout}}
        {{#ProfileWrapper}}
          {{#BaseForm
              title="Изменить данные"
              submitLabel="Сохранить"
              onSubmit=onSave
          }}
            {{#if formError}}
              {{{Alert type="danger" text=formError}}}
            {{/if}}  
            {{#with user}}  
              {{{ControlledInput
                  label="Имя"
                  name="firstName"
                  ref="firstName"
                  value=firstName
                  validationRule="${ValidationRule.Name}"
              }}}
              {{{ControlledInput
                  label="Фамилия"
                  name="secondName"
                  ref="secondName"
                  value=secondName
                  validationRule="${ValidationRule.Name}"
              }}}
              {{{ControlledInput
                  label="Почта"
                  name="email"
                  type="email"
                  ref="email"
                  value=email
                  validationRule="${ValidationRule.Email}"
              }}}
              {{{ControlledInput
                  label="Телефон"
                  name="phone"
                  ref="phone"
                  value=phone
                  validationRule="${ValidationRule.Phone}"
              }}}
              {{{ControlledInput
                  label="Логин"
                  name="login"
                  ref="login"
                  value=login
                  validationRule="${ValidationRule.Login}"
              }}}
              {{{ControlledInput
                  label="Имя в чате"
                  name="displayName"
                  ref="displayName"
                  value=displayName
              }}}
            {{/with}}    
          {{/BaseForm}}
        {{/ProfileWrapper}}
      {{/Layout}}  
    `;
  }
}

export default withStore(ProfileChangeDataPage);
