import { expect } from 'chai';
import { JSDOM } from 'jsdom';

describe('Router', () => {
  const { window } = new JSDOM('<div id=\'app\'></div>', { url: 'http://localhost' });
  // @ts-ignore
  global.window = window;

  it('Change location.pathname', () => {
    window.history.pushState({ page: 'sign-up' }, 'Register', '/sign-up');
    expect(window.location.pathname).to.eq('/sign-up');
  });
  it('Change history length', () => {
    window.history.pushState({ page: '/' }, 'Login', '/');
    expect(window.history.length).to.eq(3);
  });
});
