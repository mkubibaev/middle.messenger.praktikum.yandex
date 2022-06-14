import { Block } from 'core';
import { NavLink } from 'types';
import './MainNav.pcss';

interface MainNavProps {
  links: NavLink[];
}

export default class MainNav extends Block<MainNavProps> {
  get componentName() {
    return 'MainNav';
  }

  render() {
    // language=hbs
    return `
      <nav class="main-nav">
        <ul class="main-nav__list">
          {{#each links}}
            {{#with this}}
              <li class="main-nav__item">
                {{{Link
                    label=label
                    to=url
                    classes="main-nav__link"
                }}}
              </li>
            {{/with}}
          {{/each}}
        </ul>
      </nav>
    `;
  }
}
