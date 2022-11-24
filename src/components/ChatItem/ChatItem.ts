import { Block } from 'core';
import './ChatItem.scss';
import { ChatWithClick } from 'services';

type ChatProps = {
  chat: ChatWithClick;
  selectedChatId: number;
  events: {
    click: () => void
  }
};

export default class ChatItem extends Block<ChatProps> {
  static componentName = 'ChatItem';

  constructor(props: ChatProps) {
    super({
      ...props,
      events: {
        click: () => {
          if (props.chat.id !== props.selectedChatId) {
            props.chat.onCLick(props.chat);
          }
        },
      },
    });
  }

  render() {
    const time = this.props.chat?.lastMessage?.time;
    const localeDate = time
      ? new Date(time).toLocaleDateString('ru')
      : '';

    const active = this.props.chat.id === this.props.selectedChatId;
    // language=hbs
    return `

        <li class="chat {{#if ${active}}}active{{/if}}">
          <div class="chat__avatar">
            {{{AvatarImage avatarUrl=chat.avatar name=chat.title}}}
          </div>
          <div class="chat__info">
            <div class="chat__info-row">
                <span class="chat__name">{{chat.title}}</span>
                <time class="chat__date">${localeDate}</time>
            </div>
            <div class="chat__info-row">
                <span class="chat__message">{{chat.lastMessage.content}}</span>
                {{#if chat.unreadCount}}
                    <span class="chat__notif">{{unreadCount}}</span>
                {{/if}}
            </div>
          </div>
        </li>
    `;
  }
}
