import { Block } from 'core';
import './ProfileLayout.pcss';
import { userAvatar } from 'helpers/mockData';

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
      userAvatar,
    });
  }

  render() {
    // language=hbs
    return `
     {{#AppLayout wrapClassName="profile"}}
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
     {{/AppLayout}}   
    `;
  }
}
