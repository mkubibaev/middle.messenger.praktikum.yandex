import { Block } from 'core';
import { user } from '../../utils/mockData';

interface ProfileProps {}

export default class Profile extends Block {
  constructor(props: ProfileProps) {
    super({
      ...props,
      userData: user,
    });
  }

  render() {
    // language=hbs
    return `
     {{#ProfileLayout}}
       {{{ProfileData user=userData}}}  
     {{/ProfileLayout}}
    `;
  }
}
