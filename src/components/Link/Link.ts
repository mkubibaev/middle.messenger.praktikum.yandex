import { Block } from 'core';
import './Link.pcss';

interface LinkProps {
  label: string;
  to: string;
  classes?: string;
}

export default class Link extends Block<LinkProps> {
  get componentName(): string {
    return 'Link';
  }

  render() {
    // language=hbs
    return '<a href="{{to}}" class="link {{classes}}">{{label}}</a>';
  }
}
