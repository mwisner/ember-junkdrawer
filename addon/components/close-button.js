import Component from '@ember/component';
import layout from '../templates/components/close-button';
import {get} from '@ember/object';

const Close = Component.extend({
  layout,
  tagName: 'button',
  classNames: ['close'],
  attributeBindings: ['aria-label', 'type'],
  'aria-label': 'Close',
  type: 'button',
  // Noop
  close() {},
  click() {
    get(this, 'close')();
  }
});

Close.reopenClass({
  positionalParams: ['close']
});

export default Close;
