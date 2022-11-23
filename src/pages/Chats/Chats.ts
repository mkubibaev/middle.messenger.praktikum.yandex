import { Block, Store } from 'core';
import './Chats.scss';
import { readAndValidateForm, ValidationRule, withStore } from 'utils';
import { getChats, Chat, createChat } from 'services';

type ChatsPageProps = {
  store: Store<AppState>;
  chats: () => Chat[];
  selectedChat: () => Chat | null;
};

class ChatsPage extends Block<ChatsPageProps> {
  static componentName = 'ChatsPage';

  constructor(props: ChatsPageProps) {
    super({
      ...props,
      chats: () => props.store.getState().chats,
    });

    this.setState({
      selectedChat: () => props.store.getState().selectedChat,
      showCreateChatModal: () => this.showCreateChatModal(),
      hideCreateChatModal: () => this.hideCreateChatModal(),
      onCreateChat: (event: SubmitEvent) => this.onCreateChat(event),
      isCreateChatModalShown: false,
    });
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

  render() {
    // language=hbs
    return `
      {{#Layout}}
        <div class="chats__container container">
          <div class="chats__sidebar">
            {{{Search}}}
            <ul class="chats__list">
              {{#each chats}}
                {{{ChatItem chat=this}}}
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
              <div class="chats__messages-wrap">
                {{{Messages messages=messagesList}}}
              </div>
              <div class="chats__form-wrap">
                {{{MessageForm onSubmit=onSend}}}
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
