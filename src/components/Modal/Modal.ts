import { Block } from 'core';
import './Modal.scss';

type ModalProps = {
  title: string;
  isShown: boolean;
  closeModal: () => void;
};

export default class Modal extends Block<ModalProps> {
  static componentName = 'Modal';

  render() {
    // language=hbs
    return `
      <div class="modal {{#if isShown}}show{{/if}}">
        <div class="modal__wrap">
          {{{Button
              label="✕"
              classes="modal-close"
              onClick=closeModal
          }}}  
          <h3 class="modal__title">{{title}}</h3>

          <div class="modal__body" data-layout="${this.id}"></div>  
        </div>
      </div>
    `;
  }
}
