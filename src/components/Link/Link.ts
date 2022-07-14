import { Block, Router, Store } from 'core';
import './Link.pcss';
import { withRouter, withStore } from 'utils';

interface LinkProps {
  label: string;
  to: string;
  action?: () => void;
  classes?: string;
  router: Router;
  store: Store<AppState>;
  events: {
    click: (event: PointerEvent) => void;
  }
}

class Link extends Block<LinkProps> {
  static componentName = 'Link';

  constructor(props: LinkProps) {
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
    if (this.props.action) {
      this.props.store.dispatch(this.props.action);
    } else {
      this.props.router.go(this.props.to);
    }
  };

  render() {
    // language=hbs
    return '<a href="{{to}}" class="link {{classes}}">{{label}}</a>';
  }
}

export default withRouter(withStore(Link));
