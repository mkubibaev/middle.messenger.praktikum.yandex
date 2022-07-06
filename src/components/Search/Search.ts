import { Block } from 'core';
import './Search.pcss';

export default class Search extends Block {
  get componentName(): string {
    return 'Search';
  }

  render() {
    // language=hbs
    return `
      <form class="search-form">
        <div class="search-form__icon">
          <i class="bi bi-search"></i>
        </div>
        <input class="search-form__input" type="text" placeholder="Поиск">
      </form>
    `;
  }
}
