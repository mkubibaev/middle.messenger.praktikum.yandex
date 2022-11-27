import { Block } from 'core';
import './MessageItem.scss';

type MessageItemProps = {
  content: string;
  isRead: boolean;
  time: string;
  authorId: number;
  userId: number;
};

export default class MessageItem extends Block<MessageItemProps> {
  static componentName = 'MessageItem';

  render() {
    const localeDate = new Date(this.props.time).toLocaleString('ru');
    const own = this.props.authorId === this.props.userId;
    // language=hbs
    return `
      <li class="message {{#if ${own}}}message--own{{/if}}">
        <p class="message__text">{{content}}</p>
        <div class="message__info">
          <span class="message__date">${localeDate}</span>
          {{#if isRead}}
              <span class="message__status"><i class="bi bi-check-all"></i></span>
          {{/if}}
        </div>
      </li>
    `;
  }
}
