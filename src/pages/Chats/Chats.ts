import { Block, Store } from 'core';
import './Chats.scss';
import { readAndValidateForm, ValidationRule, withStore } from 'utils';
import { getChats, Chat, createChat, ChatWithClick, Message, connectToChatSocket, sendMessage } from 'services';

type ChatsPageProps = {
  store: Store<AppState>;
  chats: () => ChatWithClick[];
  messages: () => Message[];
};

class ChatsPage extends Block<ChatsPageProps> {
  static componentName = 'ChatsPage';

  constructor(props: ChatsPageProps) {
    super({
      ...props,
      chats: () => props.store.getState().chats.map((chat) => {
        const chatWithClick = chat as ChatWithClick;
        chatWithClick.onCLick = this.onSelectChat;
        return chatWithClick;
      }),
    });
  }

  getStateFromProps() {
    this.state = {
      selectedChat: null,
      isCreateChatModalShown: false,
      showCreateChatModal: () => this.showCreateChatModal(),
      hideCreateChatModal: () => this.hideCreateChatModal(),
      onCreateChat: (event: SubmitEvent) => this.onCreateChat(event),
      onSendMessage: (msg: string) => this.onSendMessage(msg),
      messages: () => this.props.store.getState().messages,
    };
  }

  componentDidMount() {
    this.props.store.dispatch(getChats);
  }

  showCreateChatModal() {
    this.setState({ isCreateChatModalShown: true });
  }

  hideCreateChatModal() {
    this.setState({ isCreateChatModalShown: false });
  }

  onCreateChat(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    const [isValid, formValue] = readAndValidateForm(this.refs);
    if (isValid) {
      this.props.store.dispatch(createChat, formValue);
      this.hideCreateChatModal();
    }
  }

  onSelectChat = async (chat: Chat) => {
    this.setState({ selectedChat: chat });
    this.props.store.dispatch(connectToChatSocket, {
      chatId: chat.id,
      scroll: this.scrollMessagesWrap,
    });
  };

  onSendMessage(msg: string) {
    this.props.store.dispatch(sendMessage, msg);
  }

  scrollMessagesWrap = () => {
    const wrap = document.getElementById('messages')!;
    wrap.scrollTop = wrap.scrollHeight;
  };

  render() {
    // language=hbs
    return `
      {{#Layout}}
        <div class="chats__container container">
          <div class="chats__sidebar">
            {{{Search}}}
            <ul class="chats__list">
              {{#each chats}}
                {{{ChatItem chat=this selectedChatId=${this.state.selectedChat?.id} }}}
              {{/each}}
            </ul>
            {{{Button
                label="Добавить чат"
                onClick=showCreateChatModal
                classes="btn--primary"
            }}}
          </div>

          <div class="chats__main">
            {{#if selectedChat}}
              {{{SelectedChat chat=selectedChat}}}
              <div class="chats__messages-wrap" id="messages">
                <ul class="messages">
                  {{#each messages}}
                    {{{MessageItem
                        content=this.content
                        time=this.time
                        isRead=this.is_read
                        authorId=this.user_id
                        userId=${this.props.store.getState().user?.id}
                    }}}  
                  {{/each}}
                </ul>      
              </div>
              <div class="chats__form-wrap">
                {{{MessageForm onSubmit=onSendMessage}}}
              </div>
            {{else}}
              <div class="chats__placeholder">
                <p>Выберите чат чтобы отправить сообщение</p>
              </div>
            {{/if}}
          </div>
        </div>

        {{#Modal
            title="Добавить чат"
            isShown=isCreateChatModalShown
            closeModal=hideCreateChatModal
        }}
          {{#BaseForm
              submitLabel="Сохранить"
              onSubmit=onCreateChat
          }}
            {{{ControlledInput
                label="Назвение чата"
                name="title"
                ref="title"
                validationRule="${ValidationRule.Required}"
            }}}
          {{/BaseForm}}
        {{/Modal}}
      {{/Layout}}
    `;
  }
}

export default withStore(ChatsPage);
