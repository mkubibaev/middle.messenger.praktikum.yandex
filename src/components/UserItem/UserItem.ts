import { Block } from 'core';

type UserItemProps = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  onClick: (id: number) => void;
  events: {
    click: (id: number) => void;
  }
};

export default class UserItem extends Block<UserItemProps> {
  static componentName = 'UserItem';

  constructor(props: UserItemProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick(props.id),
      },
    });
  }

  render() {
    // language=hbs
    return `
      {{{Button
        label="${this.props.login} - ${this.props.firstName} ${this.props.secondName}"
        classes="menu-item"
      }}}
    `;
  }
}
