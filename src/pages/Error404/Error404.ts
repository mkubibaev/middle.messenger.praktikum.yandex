import { Block, Router } from 'core';
import { withRouter } from 'utils';

type Error404PageProps = {
  router: Router
};

class Error404Page extends Block<Error404PageProps> {
  static componentName = 'Error404Page';

  render() {
    // language=hbs
    return `
      <main class="error-page container">
        <div class="error-card">
          <strong class="error-card__code">404</strong>
          <p class="error-card__msg">Страница не найдена</p>
          {{{Link
              label="Назад к чатам"
              to="/"
          }}}
        </div>
      </main>
    `;
  }
}

export default withRouter(Error404Page);
