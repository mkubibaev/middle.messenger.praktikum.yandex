import { Block, Router } from 'core';
import { withRouter } from 'utils';

type OnBoardingPageProps = {
  router: Router;
};

class OnBoardingPage extends Block<OnBoardingPageProps> {
  static componentName = 'OnBoardingPage';

  render() {
    // language=hbs
    return `
      <div>
        <h3>Onboarding Page</h3>
        {{{Link
          label="Login"
          to="/login"
        }}}
      </div>
    `;
  }
}

export default withRouter(OnBoardingPage);
