import { Block, Router } from 'core';
import { withRouter } from 'utils';

const mockUser = {
  id: 123,
  login: 'ivan',
  firstName: 'Иван',
  secondName: 'Иваов',
  displayName: 'qweqweqwe',
  avatar: 'https://robohash.org/51e6d8f1948e909898302c6b9edcc05d?set=set1&bgset=bg1&size=400x400',
  phone: '123123123',
  email: 'ivan@ivan.ru',
};

interface ProfilePageProps {
  router: Router;
  user: User;
}

class ProfilePage extends Block<ProfilePageProps> {
  static componentName = 'ProfilePage';

  constructor(props: ProfilePageProps) {
    super({
      ...props,
      user: mockUser,
    });
  }

  render() {
    // language=hbs
    // return `
    //  {{#ProfileLayout}}
    //    {{{ProfileData user=user}}}
    //  {{/ProfileLayout}}
    // `;
    return `
      {{#Layout}}
        <div>Profile page</div>
      {{/Layout}} 
    `;
  }
}

export default withRouter(ProfilePage);
