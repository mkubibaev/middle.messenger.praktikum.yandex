import { Block, Router } from 'core';
import './Link.pcss';
import { withRouter } from 'utils';

interface LinkProps {
  label: string;
  to: string;
  classes?: string;
  router: Router;
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
    this.props.router.go(this.props.to);
  };

  render() {
    // language=hbs
    return '<a href="{{to}}" class="link {{classes}}">{{label}}</a>';
  }
}

export default withRouter(Link);
