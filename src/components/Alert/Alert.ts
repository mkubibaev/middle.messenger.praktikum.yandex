import { Block } from 'core';
import './Alert.scss';

type AlertProps = {
  type: 'success' | 'danger' | 'warning';
  text: string;
};

export default class Alert extends Block<AlertProps> {
  static componentName = 'Alert';

  render() {
    // language=hbs
    return `
      <div class="alert alert--{{type}}">
        <span>{{text}}</span>
      </div>
    `;
  }
}
