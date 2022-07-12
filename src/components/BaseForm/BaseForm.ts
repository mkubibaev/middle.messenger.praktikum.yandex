import { Block } from 'core';
import './BaseForm.pcss';

type BaseFormProps = {
  title: string;
  submitLabel: string;
  onSubmit: () => void;
  events: {
    submit: () => void;
  };
};

export default class BaseForm extends Block<BaseFormProps> {
  static componentName = 'BaseForm';

  constructor(props: BaseFormProps) {
    super({
      ...props,
      events: { submit: props.onSubmit },
    });
  }

  render() {
    // language=hbs
    return `
      <form class="base-form">
        <h2 class="base-form__title">{{title}}</h2>
      
        <div class="base-form__inputs" data-layout="${this.id}"></div>
      
        <div class="base-form__actions">
          {{{Button
              label=submitLabel
              type="submit"
              classes="base-form__submit btn--primary"
          }}}
          {{#if linkLabel}}
            {{{Link
              label=linkLabel
              to=linkUrl
              classes="base-form__link"
            }}}
          {{/if}}  
        </div>
      </form>
    `;
  }
}
