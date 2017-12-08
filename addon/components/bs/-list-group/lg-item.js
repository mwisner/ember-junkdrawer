import Component from '@ember/component';
import {get, set, computed} from '@ember/object';
import layout from '../../../templates/components/bs/-list-group/lg-item';

export default Component.extend({
  layout,
  tagName: 'li',
  classNameBindings: ['disabled', 'active', '_boundType'],
  classNames: ['list-group-item'],

  /**
   * Whether or not to style the item as disabled
   * @public
   * @type {Boolean}
   */
  disabled: false,

  /**
   * Style like it's active
   * @public
   * @type {Boolean}
   */
  active: false,

  /**
   * Provide a type for contextual feedback.
   * @public
   * @type {string}
   * Properties: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
   */
  type: false,

  /**
   * Observer for Class Bindings
   * @private
   * @return {[type]} [description]
   */
  _boundType: computed('type', function() {
    return `list-group-item-${get(this, 'type')}`;
  }),

  /**
   * Provide text if you'd like to use the inline flavor
   * @type {string}
   */
  text: null
});
