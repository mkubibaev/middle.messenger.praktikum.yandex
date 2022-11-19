import { Block } from 'core';
import './Loader.scss';

export default class Loader extends Block<{}> {
  static componentName = 'Loader';

  render() {
    return `
      <div class="loader"><div class="loader__ring"></div></div>
    `;
  }
}
