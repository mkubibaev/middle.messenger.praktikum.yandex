import { Block } from 'core';
import { Message } from 'types';
import './Messages.pcss';

interface MessagesProps {
  messages: Message[];
}

export default class Messages extends Block<MessagesProps> {
  get componentName(): string {
    return 'Messages';
  }

  render() {
    // language=hbs
    return `
      <ul class="messages">
        {{#each messages}}
          {{#with this}}
            <li class="message {{#if own}}message--own{{/if}}">
              <p class="message__text">{{text}}</p>
              <div class="message__info">
                <span class="message__date">{{dateTime}}</span>
                {{#if status}}
                  <span class="message__status"><i class="bi bi-check-all"></i></span>
                {{/if}}
              </div>
            </li>
          {{/with}}
        {{/each}}
      </ul>
    `;
  }
}
