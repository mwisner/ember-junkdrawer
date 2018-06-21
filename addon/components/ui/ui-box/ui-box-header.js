import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'h5',
  classNames: ['card-header', 'd-flex', 'align-items-center', 'px-3'],
  classNameBindings: ['justifyContentClass', 'paddingClass'],

  /**
   * Justify Content
   * @type {String}
   */
  justifyContent: 'start',

  /**
   * Default Padding
   * @type {Number}
   */
  paddingSize: 3,

  justifyContentClass: computed('justifyContent', function() {
    return `justify-content-${this.get('justifyContent')}`;
  }),

  paddingClass: computed('paddingSize', function() {
    return `py-${this.get('paddingSize')}`;
  }),
});
