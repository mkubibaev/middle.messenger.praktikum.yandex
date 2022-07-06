import { Block } from 'core';
import './Header.pcss';

export default class Header extends Block {
  get componentName(): string {
    return 'Header';
  }

  render() {
    // language=hbs
    return `
      <header class="header">
        <div class="header__container container" data-layout="${this.id}">
          <a href="./index.html" class="logo"><i class="bi bi-chat-dots-fill logo__icon"></i> SomeChat</a>
        </div>
      </header>
    `;
  }
}
