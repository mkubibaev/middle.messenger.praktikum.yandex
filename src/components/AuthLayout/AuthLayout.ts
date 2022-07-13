import { Block } from 'core';
import './AuthLayout.pcss';
import { NavLink } from 'types';
import { ANONYMOUS_NAV } from '../../constants';

type AuthLayoutProps = {
  navLinks: NavLink[];
};

export default class AuthLayout extends Block<AuthLayoutProps> {
  static componentName = 'AuthLayout';

  constructor(props: AuthLayoutProps) {
    super({
      ...props,
      navLinks: ANONYMOUS_NAV,
    });
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
