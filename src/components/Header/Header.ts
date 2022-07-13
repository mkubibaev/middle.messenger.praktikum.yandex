import { Block } from 'core';
import './Header.pcss';

type HeaderProps = {};

export default class Header extends Block<HeaderProps> {
  static componentName = 'Header';

  render() {
    // language=hbs
    return `
      <header class="header">
        <div class="header__container container" data-layout="${this.id}">
          <a href="/" class="logo"><i class="bi bi-chat-dots-fill logo__icon"></i> SomeChat</a>
        </div>
      </header>
    `;
  }
}
