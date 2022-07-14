import { Block } from 'core';
import { NavLink } from 'types';
import { logout } from '../../services';

const userNav: NavLink[] = [
  { path: '/messenger', label: 'Чат' },
  { path: '/settings', label: 'Профиль' },
  { path: '/', label: 'Выход', action: logout },
];

interface AppLayoutProps {
  wrapClassName: string;
  navLinks: NavLink[];
}

export default class AppLayout extends Block<AppLayoutProps> {
  static componentName = 'AppLayout';

  constructor(props: AppLayoutProps) {
    super({
      ...props,
      navLinks: userNav,
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
