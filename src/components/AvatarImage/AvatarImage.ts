import { Block } from 'core';
import './AvatarImage.scss';

type AvatarImageProps = {
  avatarUrl: string | undefined;
  name: string;
  src: () => string;
};

export default class AvatarImage extends Block<AvatarImageProps> {
  static componentName = 'AvatarImage';

  constructor(props: AvatarImageProps) {
    super(props);

    this.setProps({
      ...props,
      src: () => this.props.avatarUrl || `https://robohash.org/${this.props.name}`,
    });
  }

  render() {
    // language=hbs
    return `
      <img class="avatar-img" src="{{src}}" alt="{{name}}"/>
    `;
  }
}
