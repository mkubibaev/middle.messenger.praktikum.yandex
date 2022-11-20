import { Block, Store } from 'core';
import './ProfileAvatar.scss';
import { withStore } from '../../utils';
import { chaneAvatar } from '../../services/user';

type ProfileAvatarProps = {
  store: Store<AppState>;
  avatarUrl: string | undefined;
  name: string;
  formError: () => string | null;
  events: {
    change: (e: Event) => void
  }
};

class ProfileAvatar extends Block<ProfileAvatarProps> {
  static componentName = 'ProfileAvatar';

  constructor(props: ProfileAvatarProps) {
    super({
      ...props,
      events: {
        change: (event) => this.onUpload(event),
      },
    });

    this.setProps({
      ...props,
      avatarUrl: props.store.getState().user?.avatar
        ? `${process.env.API_ENDPOINT}resources${props.store.getState().user?.avatar}`
        : undefined,
      name: `${props.store.getState().user?.firstName} ${props.store.getState().user?.secondName}`,
      formError: () => props.store.getState().avatarFormError,
    });
  }

  onUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input?.files?.length) {
      return;
    }
    const avatarFormData = new FormData();
    avatarFormData.append('avatar', input.files[0]);
    this.props.store.dispatch(chaneAvatar, avatarFormData);
  }

  render() {
    // language=hbs
    return `
      <div class="profile__avatar">
        <div class="profile__avatar-img">
            {{{AvatarImage name=name avatarUrl=avatarUrl}}}
        </div>
        {{{InputError text=formError}}}
        <label class="profile__avatar-input">
          <input type="file" accept=".jpg, .jpeg, .png">
          <span>Загрузить аватар</span>
        </label>
      </div>
    `;
  }
}

export default withStore(ProfileAvatar);
