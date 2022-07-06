import { Block } from '../../core';
import './Error.pcss';

interface ErrorProps {
  code: number;
  message: string;
}

export default class Error extends Block<ErrorProps> {
  render() {
    // language=hbs
    return `
      <main class="error-page container">
        <div class="error-card">
          <strong class="error-card__code">{{code}}</strong>
          <p class="error-card__msg">{{message}}</p>
          <a class="link" href="./index.html">Назад к чатам</a>
        </div>
      </main>
    `;
  }
}
