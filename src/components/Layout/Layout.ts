import { Block } from 'core';

type LayoutProps = {};

export default class Layout extends Block<LayoutProps> {
  static componentName = 'Layout';

  render() {
    // language=hbs
    return `
      <div class="wrapper">
        {{{Header}}}
        <main class="main" data-layout="${this.id}"></main>
      </div>
    `;
  }
}
