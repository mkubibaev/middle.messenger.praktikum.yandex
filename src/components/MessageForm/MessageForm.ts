import { Block } from 'core';
import './MessageForm.scss';

type MessageFormProps = {
  onSubmit: (msg: string) => void;
  events: {
    submit: (event: SubmitEvent) => void;
  }
};

export default class MessageForm extends Block<MessageFormProps> {
  static componentName = 'MessageForm';

  constructor(props: MessageFormProps) {
    super({
      ...props,
      events: {
        submit: (event) => {
          const value = this.onSubmitForm(event);
          props.onSubmit(value);
        },
      },
    });
  }

  onSubmitForm = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const input = this.refs.input.element as HTMLInputElement;
    return input.value;
  };

  render() {
    // language=hbs
    return `
      <form class="message-form">
        <div class="message-form__inner">
          {{{Input
              placeholder="Сообщение..."
              classes="message-form__input"
              ref="input"
          }}}
<!--          <button class="message-form__btn " type="button">-->
<!--            <i class="bi bi-paperclip"></i>-->
<!--          </button>-->
        </div>
        <button class="message-form__btn message-form__btn--submit" type="submit">
          <i class="bi bi-send"></i>
        </button>
      </form>
    `;
  }
}
