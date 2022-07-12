import { Block, Router } from 'core';
import './Chats.pcss';
import { withRouter } from '../../utils';

type ChatsPageProps = {
  router: Router;
  onSend: (event: SubmitEvent) => void;
};

class ChatsPage extends Block<ChatsPageProps> {
  static componentName = 'ChatsPage';

  constructor(props: ChatsPageProps) {
    super({
      ...props,
      // contactsList: contacts,
      // selectedContact: contacts[0],
      // messagesList: messages,
    });

    this.setProps({
      ...props,
      onSend: this.onSend,
    });
  }

  onSend = (event: SubmitEvent) => {
    event.preventDefault();
    console.log(event);
  };

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
              {{{MessageForm
                  onSubmit=onSend
              }}}
            </div>
          </main>
        </div>
      {{/AppLayout}}
    `;
  }
}

export default withRouter(ChatsPage);
