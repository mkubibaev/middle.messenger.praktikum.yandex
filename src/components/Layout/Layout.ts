import { Block } from 'core';
import { withIsLoading } from '../../utils';

type LayoutProps = {
  isLoading: boolean;
};

class Layout extends Block<LayoutProps> {
  static componentName = 'Layout';

  render() {
    // language=hbs
    return `
      <div class="wrapper">
        {{{Header}}}
        {{#if isLoading}}
          {{{Loader}}}    
        {{/if}}  
        <main class="main" data-layout="${this.id}"></main>
      </div>
    `;
  }
}

export default withIsLoading(Layout);
