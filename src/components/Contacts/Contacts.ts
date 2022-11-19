import { Block } from 'core';
import { Contact } from 'types';
import './Contacts.scss';

type ContactsProps = {
  list: Contact[];
  selectedContactId: string;
};

export default class Contacts extends Block<ContactsProps> {
  static componentName = 'Contacts';

  render() {
    // language=hbs
    return `
      <ul class="contacts">
        {{#each list}}
          {{#with this}}
            <li class="contact {{#if selected}}active{{/if}}">
              <div class="contact__avatar">
                <img class="contact__avatar-img" src={{avatar}} alt={{name}}>
              </div>
              <div class="contact__info">
                <div class="contact__info-row">
                    <span class="contact__name">{{name}}</span>
                    <time class="contact__date">{{lastSeen}}</time>
                </div>
                <div class="contact__info-row">
                  <span class="contact__message">{{message}}</span>
                  {{#if notif}}
                    <span class="contact__notif">{{notif}}</span>
                  {{/if}}
                </div>
              </div>
            </li>
          {{/with}}
        {{/each}}
      </ul>
    `;
  }
}
