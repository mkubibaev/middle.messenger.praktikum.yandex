import { Block } from '../../core';

export default class ProfileChangeData extends Block {
  render() {
    // language=hbs
    return `  
      {{#ProfileLayout}}
        {{{ProfileForm}}}  
      {{/ProfileLayout}}
    `;
  }
}
