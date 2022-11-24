import { Block, Store } from 'core';
import './SelectedChat.scss';
import { addUsersToChat, Chat, deleteChat, searchUser, getChatUsers, deleteUserFromChat } from 'services';
import { readAndValidateForm, transformUser, ValidationRule, withStore } from 'utils';

type UserItem = User & {
  onClick: (id: number) => void
};

type SelectedChatProps = {
  store: Store<AppState>;
  chat: Chat;
};

class SelectedChat extends Block<SelectedChatProps> {
  static componentName = 'SelectedChat';

  getStateFromProps() {
    this.state = {
      isChatMenuShown: false,
      isUserAddModalShown: false,
      isUserDeleteModalShown: false,
      foundUsers: [],
      chatUsers: [],
      formError: '',
      toggleChatMenu: () => this.toggleChatMenu(),
      showUserAddModal: () => this.showUserAddModal(),
      hideUserAddModal: () => this.hideUserAddModal(),
      showUserDeleteModal: () => this.showUserDeleteModal(),
      hideUserDeleteModal: () => this.hideUserDeleteModal(),
      onDeleteChat: () => this.onDeleteChat(),
      searchUser: (event: SubmitEvent) => this.searchUser(event),
    };
  }

  toggleChatMenu() {
    this.setState({ isChatMenuShown: !this.state.isChatMenuShown });
  }

  showUserAddModal() {
    this.setState({ isUserAddModalShown: true });
    this.toggleChatMenu();
  }

  hideUserAddModal() {
    this.setState({ isUserAddModalShown: false, foundUsers: [], formError: null });
  }

  showUserDeleteModal() {
    this.setState({ isUserDeleteModalShown: true });
    this.toggleChatMenu();
    this.getSelectedChatUsers(this.props.chat.id);
  }

  hideUserDeleteModal() {
    this.setState({ isUserDeleteModalShown: false, foundUsers: [], formError: null });
  }

  onDeleteChat() {
    const chatId = this.props?.chat.id;
    if (chatId) {
      this.props.store.dispatch(deleteChat, { chatId });
    }
  }

  async searchUser(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    const [isValid, formValue] = readAndValidateForm(this.refs);
    if (isValid) {
      this.setState({ formError: '' });
      const foundUsers = await searchUser(formValue as { login: string });
      if (foundUsers.length === 0) {
        this.setState({ formError: 'Пользователь не найден' });
      } else {
        // костыль, не смог передать колбэк внутри хелпера #each
        const users = foundUsers.map((u) => {
          const user = transformUser(u);
          (user as UserItem).onClick = this.addUserToChat;
          return user;
        });
        this.setState({ foundUsers: users });
      }
    }
  }

  addUserToChat = (userId: number) => {
    this.props.store.dispatch(addUsersToChat, {
      users: [userId],
      chatId: this.props.chat.id,
    });
  };

  deleteUserFormChat = (userId: number) => {
    this.props.store.dispatch(deleteUserFromChat, {
      users: [userId],
      chatId: this.props.chat.id,
    });
  };

  async getSelectedChatUsers(chatId: number) {
    const chatUsersDTO = await getChatUsers(chatId);
    const chatUsers = chatUsersDTO.map((u) => {
      const user = transformUser(u);
      (user as UserItem).onClick = this.deleteUserFormChat;
      return user;
    });
    this.setState({ chatUsers });
  }

  render() {
    const { foundUsers, chatUsers } = this.state;
    // language=hbs
    return `
      <div class="selected-chat">
         {{#with chat}}
           <div class="selected-chat__inner">
             <div class="selected-chat__avatar">
                 {{{AvatarImage avatarUrl=avatar name=title}}}
             </div>
             <span class="selected-chat__name">{{title}}</span>
           </div>
         {{/with}} 
        
          
          {{#Button
              onClick=toggleChatMenu
              classes="selected-chat__menu-btn"
          }}<i class="bi bi-three-dots"></i>{{/Button}}
          
          <ul class="selected-chat__menu {{#if isChatMenuShown}}active{{/if}}">
            <li>{{{Button label="Добавить пользователя" onClick=showUserAddModal classes="menu-item"}}}</li>
            <li>{{{Button label="Удалить пользователя" onClick=showUserDeleteModal classes="menu-item"}}}</li>
            <li>{{{Button label="Удалить чат" onClick=onDeleteChat classes="menu-item"}}}</li>
          </ul>

          {{#Modal
              title="Добавить пользователя"
              isShown=isUserAddModalShown
              closeModal=hideUserAddModal
          }}
              {{#if formError}}
                {{{Alert type="danger" text=formError}}}
              {{/if}}

              {{#if ${foundUsers?.length}}}
                <div class="user-list">  
                  {{#each foundUsers}}
                    {{{UserItem
                      id=this.id
                      login=this.login
                      firstName=this.firstName
                      secondName=this.secondName
                      onClick=this.onClick
                    }}}
                  {{/each}}
                </div>  
              {{else}}
              {{#BaseForm
                  submitLabel="Поиск"
                  onSubmit=searchUser
              }}
                {{{ControlledInput
                    label="Логин"
                    name="login"
                    ref="login"
                    validationRule="${ValidationRule.Required}"
                }}}
              {{/BaseForm}}
            {{/if}}
          {{/Modal}}
          
          {{#Modal
              title="Удалить пользователя"
              isShown=isUserDeleteModalShown
              closeModal=hideUserDeleteModal
          }}
            {{#if ${chatUsers?.length}}}  
              <div class="user-list">
                {{#each chatUsers}}
                  {{{UserItem
                      id=this.id
                      login=this.login
                      firstName=this.firstName
                      secondName=this.secondName
                      onClick=this.onClick
                  }}}
                {{/each}}
              </div>
            {{else}}
              {{{Alert type="warning" text="Пользователи отсутствуют"}}}  
            {{/if}}    
          {{/Modal}}
      </div>
     
    `;
  }
}

export default withStore(SelectedChat);
