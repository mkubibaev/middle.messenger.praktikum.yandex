import { Block } from 'core';
import { userNav } from 'helpers/mockData';

interface AppLayoutProps {
  wrapClassName: string;
}

export default class AppLayout extends Block {
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
