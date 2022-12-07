import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Block from './Block';

type TestAlertProps = {
  type: 'success' | 'danger' | 'warning';
  text: string;
};

describe('Block', () => {
  const { window } = new JSDOM('<div id=\'app\'></div>', { url: 'http://localhost' });
  // @ts-ignore
  global.window = window;
  global.document = window.document;
  global.Node = window.Node;

  class TestAlert extends Block<TestAlertProps> {
    render() {
      return `
      <div class="alert alert--{{type}}">
        <span>{{text}}</span>
      </div>
    `;
    }
  }

  it('Create component with props', () => {
    const alertBlock = new TestAlert({ type: 'success', text: 'ok' });
    expect(alertBlock.getContent().classList.contains('alert--success')).to.eq(true);
    expect(alertBlock.getContent().innerHTML.includes('ok')).to.eq(true);
  });

  it('Update component props', () => {
    const alertBlock = new TestAlert({ type: 'success', text: 'ok' });
    alertBlock.setProps({ type: 'danger', text: 'error' });
    expect(alertBlock.getContent().classList.contains('alert--danger')).to.eq(true);
    expect(alertBlock.getContent().innerHTML.includes('error')).to.eq(true);
  });
});
