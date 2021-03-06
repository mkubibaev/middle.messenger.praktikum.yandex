import { Block } from 'core';
import { User } from '../../types';
import './ProfileData.pcss';

interface ProfileDataProps {
  user: User,
}

export default class ProfileData extends Block<ProfileDataProps> {
  get componentName(): string {
    return 'ProfileData';
  }

  render() {
    // language=hbs
    return `
      {{#with user}}
        <ul class="profile-data">
          <li class="profile-data__item">
            <span class="profile-data__label">Имя</span>
            <p class="profile-data__value">{{first_name}}</p>
          </li>
          <li class="profile-data__item">
            <span class="profile-data__label">Фамилия</span>
            <p class="profile-data__value">{{second_name}}</p>
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
    `;
  }
}
