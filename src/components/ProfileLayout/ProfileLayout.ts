import { Block } from 'core';
import './ProfileLayout.scss';

type ProfileLayoutProps = {};

export default class ProfileLayout extends Block<ProfileLayoutProps> {
  static componentName = 'ProfileLayout';

  constructor(props: ProfileLayoutProps) {
    super({
      ...props,
      userData: {
        first_name: 'Иван',
        second_name: 'Иванов',
      },
      userAvatar: 'https://robohash.org/51e6d8f1948e909898302c6b9edcc05d?set=set1&bgset=bg1&size=400x400',
    });
  }

  render() {
    // language=hbs
    return `

       <main class="profile__container container">
         <div class="profile__inner">
           <div class="profile__inner-left">
             <div class="profile__avatar">
               <img class="profile__avatar-img" src={{userAvatar}} alt={{userData.first_name}}>
             </div>
             <p class="profile__name">{{userData.first_name}} {{userData.second_name}}</p>
             <ul class="profile__links">
               <li>
                 {{{Link
                     to="/profile-change-data"
                     label="Изменить данные"
                     classes="profile__link"
                 }}}
               </li>
               <li>
                 {{{Link
                     to="/profile-change-password"
                     label="Изменить пароль"
                     classes="profile__link"
                 }}}
               </li>
             </ul>
           </div>
           <div class="profile__inner-right" data-layout="${this.id}"></div>
         </div>
       </main>
    `;
  }
}
