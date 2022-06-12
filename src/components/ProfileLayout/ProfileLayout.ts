import { Block } from 'core';
import './ProfileLayout.pcss';
import { user } from '../../utils/mockData';

interface ProfileLayoutProps {}

export default class ProfileLayout extends Block {
  constructor(props: ProfileLayoutProps) {
    super({
      ...props,
      userData: user,
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
               <img class="profile__avatar-img" src={{userData.avatar}} alt={{userData.first_name}}>
             </div>
             <p class="profile__name">{{userData.first_name}} {{userData.second_name}}</p>
             <ul class="profile__links">
               <li>
                 {{{Link
                     to="./profile-change-data.html"
                     label="Изменить данные"
                     classes="profile__link"
                 }}}
               </li>
               <li>
                 {{{Link
                     to="./profile-change-password.html"
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
