import { Block } from 'core';
import './AuthLayout.pcss';
import { anonymousNav } from 'helpers/mockData';

interface AuthLayoutProps {}

export default class AuthLayout extends Block {
  constructor(props: AuthLayoutProps) {
    super({
      ...props,
      navLinks: anonymousNav,
    });
  }

  get componentName(): string {
    return 'AuthLayout';
  }

  render() {
    // language=hbs
    return `
      <div class="auth">
        {{#Header}}
          {{{MainNav links=navLinks}}}
        {{/Header}}
      
        <main class="auth__container container">
          <div class="auth__inner" data-layout="${this.id}"></div>
        </main>
      </div>
    `;
  }
}
