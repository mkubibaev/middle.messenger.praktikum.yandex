import { Block } from 'core';
import { contacts, messages } from '../../utils/mockData';
import './Chats.pcss';

interface ChatsProps {}

export default class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super({
      ...props,
      contactsList: contacts,
      selectedContact: contacts[0],
      messagesList: messages,
    });
  }

  render() {
    // language=hbs
    return `
      {{#AppLayout wrapClassName="chat"}}
        <div class="chat__container container">
          <aside class="chat__sidebar">
            {{{Search}}}
            {{{Contacts list=contactsList}}}
          </aside>

          <main class="chat__main">
            {{{SelectedContact contact=selectedContact}}}

            <div class="chat__messages-wrap">
              {{{Messages messages=messagesList}}}
            </div>
            <div class="chat__form-wrap">
              {{{MessageForm}}}
            </div>
          </main>
        </div>
      {{/AppLayout}}
    `;
  }
}
