import { Block, Router } from 'core';
import './Header.pcss';
import { withRouter } from '../../utils';

type HeaderProps = {
  router: Router;
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
      events: {
        click: this.onClick,
      },
    });
  }

  onClick = (event: PointerEvent) => {
    event.preventDefault();
    this.props.router.go('/');
  };

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

export default withRouter(Header);
