import { Block } from 'core';
import { USER_NAV } from '../../constants';
import { NavLink } from '../../types';

interface AppLayoutProps {
  wrapClassName: string;
  navLinks: NavLink[];
}

export default class AppLayout extends Block<AppLayoutProps> {
  static componentName = 'AppLayout';

  constructor(props: AppLayoutProps) {
    super({
      ...props,
      navLinks: USER_NAV,
    });
  }

  render() {
    // language=hbs
    return `
      <div class="wrapper">
        {{#Header}}
          {{{MainNav links=navLinks}}}
        {{/Header}}
        <div class="{{wrapClassName}}" data-layout="${this.id}"></div>  
      </div>
    `;
  }
}
