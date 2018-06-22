import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['card-footer', 'd-flex', 'align-items-center'],
  classNameBindings: ['justifyContentClass'],

  /**
   * Justify Content
   * @type {String}
   */
  justifyContent: 'end',

  justifyContentClass: computed('justifyContent', function() {
    return `justify-content-${this.get('justifyContent')}`;
  }),
});
