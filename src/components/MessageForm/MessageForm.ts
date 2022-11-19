import { Block } from 'core';
import './MessageForm.scss';

type MessageFormProps = {
  onSubmit: () => void;
  events: {
    submit: () => void;
  }
};

export default class MessageForm extends Block<MessageFormProps> {
  static componentName = 'MessageForm';

  constructor(props: MessageFormProps) {
    super({
      ...props,
      events: { submit: props.onSubmit },
    });
  }

  render() {
    // language=hbs
    return `
      <form class="message-form">
        <div class="message-form__inner">
          <input class="message-form__input" type="text" placeholder="Сообщение..." name="message">
          <button class="message-form__btn " type="button">
            <i class="bi bi-paperclip"></i>
          </button>
        </div>
        <button class="message-form__btn message-form__btn--submit" type="submit">
          <i class="bi bi-send"></i>
        </button>
      </form>
    `;
  }
}
