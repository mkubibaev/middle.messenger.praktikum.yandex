import { Block, Router } from 'core';
import './Error.scss';
import { withRouter } from 'utils';

interface ErrorPageProps {
  code: number;
  message: string;
  router: Router
}

class ErrorPage extends Block<ErrorPageProps> {
  static componentName = 'ErrorPage';

  render() {
    // language=hbs
    return `
      <main class="error-page container">
        <div class="error-card">
          <strong class="error-card__code">{{code}}</strong>
          <p class="error-card__msg">{{message}}</p>
          {{{Link
              label="Назад к чатам"
              to="/"
          }}}
        </div>
      </main>
    `;
  }
}

export default withRouter(ErrorPage);
