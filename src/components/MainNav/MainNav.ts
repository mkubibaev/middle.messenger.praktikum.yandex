import { Block } from 'core';
import { NavLink } from 'types';
import './MainNav.pcss';

type MainNavProps = {
  links: NavLink[];
};

export default class MainNav extends Block<MainNavProps> {
  static componentName = 'MainNav';

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
                    to=path
                    action=action
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
