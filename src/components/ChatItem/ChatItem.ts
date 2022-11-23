import { Block, Store } from 'core';
import './ChatItem.scss';
import { Chat } from 'services';
import { withStore } from '../../utils';

type ChatProps = {
  store: Store<AppState>;
  chat: Chat;
  events: {
    click: () => void
  }
};

class ChatItem extends Block<ChatProps> {
  static componentName = 'ChatItem';

  constructor(props: ChatProps) {
    super({
      ...props,
      events: {
        click: () => this.onSelectChat(props.chat),
      },
    });
  }

  componentDidUpdate(): boolean {
    return false;
  }

  onSelectChat(chat: Chat) {
    this.props.store.dispatch({ selectedChat: chat });
  }

  render() {
    const time = this.props.chat?.lastMessage?.time;
    const localeDate = time
      ? new Date(time).toLocaleDateString('ru')
      : '';

    const active = this.props.chat.id === this.props.store.getState().selectedChat?.id;

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

export default withStore(ChatItem);
