import { Block, Router, Store } from 'core';
import './Header.scss';
import { withRouter, withStore } from 'utils';
import { logout } from '../../services';

const anonymNav: NavLink[] = [
  { path: '/', label: 'Вход' },
  { path: '/sign-up', label: 'Регистрация' },
];

const userNav: NavLink[] = [
  { path: '/messenger', label: 'Чат' },
  { path: '/settings', label: 'Профиль' },
  { path: '/', label: 'Выход', action: logout },
];

type HeaderProps = {
  links: () => NavLink[];
  router: Router;
  store: Store<AppState>;
  events: {
    click: (event: PointerEvent) => void;
  }
};

class Header extends Block<HeaderProps> {
  static componentName = 'Header';

  constructor(props: HeaderProps) {
    super(props);

    this.setProps({
      ...props,
      links: () => {
        return props.store.getState().user ? userNav : anonymNav;
      },
      events: {
        click: (event: PointerEvent) => {
          event.preventDefault();
          event.stopPropagation();
          if (props.store.getState().user) {
            this.props.router.go('/messenger');
          } else {
            this.props.router.go('/');
          }
        },
      },
    });
  }

  render() {
    // language=hbs
    return `
      <header class="header">
        <div class="header__container container">
          <a href="/" class="logo"><i class="bi bi-chat-dots-fill logo__icon"></i> SomeChat</a>

            <nav class="nav">
              <ul class="nav__list">
                {{#each links}}
                  {{#with this}}
                    <li class="nav__item">
                      {{{Link
                          label=label
                          to=path
                          action=action
                          classes="nav__link"
                      }}}
                    </li>
                  {{/with}}
                {{/each}}
              </ul>
            </nav>
        </div>
      </header>
    `;
  }
}

export default withRouter(withStore(Header));
