import { Block } from 'core';
import { Contact } from 'types';
import './SelectedContact.pcss';

type SelectedContactProps = {
  contact: Contact;
};

export default class SelectedContact extends Block<SelectedContactProps> {
  static componentName = 'SelectedContact';

  render() {
    return `
      <div class="selected-contact">
        <div class="selected-contact__inner">
          <div class="selected-contact__avatar">
            <img class="selected-contact__avatar-img"
                 src={{contact.avatar}}
                 alt={{contact.name}}
            >
          </div>
          <span class="selected-contact__name">{{contact.name}}</span>
        </div>
        <button class="selected-contact__menu-btn" type="button">
          <i class="bi bi-three-dots"></i>
        </button>
      </div>
    `;
  }
}
