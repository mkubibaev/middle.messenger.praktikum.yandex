import { Block, Store } from 'core';
import { withStore } from 'utils';

interface ProfilePageProps {
  store: Store<AppState>;
  user: () => User | null;
  isLoading: () => boolean;
}

class ProfilePage extends Block<ProfilePageProps> {
  static componentName = 'ProfilePage';

  constructor(props: ProfilePageProps) {
    super(props);

    this.setProps({
      ...props,
      user: () => props.store.getState().user,
      isLoading: () => props.store.getState().isLoading,
    });
  }

  render() {
    // language=hbs
    return `
      {{#Layout}}
        {{#ProfileWrapper}}
          {{#with user}}
            <ul class="profile-data">
              <li class="profile-data__item">
                <span class="profile-data__label">Имя</span>
                <p class="profile-data__value">{{firstName}}</p>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__label">Фамилия</span>
                <p class="profile-data__value">{{secondName}}</p>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__label">Имя в чате</span>
                <p class="profile-data__value">
                    {{#if displayName}}
                      {{displayName}}
                    {{else}}
                        -
                    {{/if}}    
                </p>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__label">Логин</span>
                <p class="profile-data__value">{{login}}</p>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__label">Почта</span>
                <p class="profile-data__value">{{email}}</p>
              </li>
              <li class="profile-data__item">
                <span class="profile-data__label">Телефон</span>
                <p class="profile-data__value">{{phone}}</p>
              </li>
            </ul>
          {{/with}}   
        {{/ProfileWrapper}}
        {{#if isLoading}}
            {{{Loader}}}
        {{/if}}
      {{/Layout}}
    `;
  }
}

export default withStore(ProfilePage);
