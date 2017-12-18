import Item from './lg-item';
import {get} from '@ember/object';
import layout from '../../../templates/components/bs/-list-group/lg-item';

export default Item.extend({
  layout,
  tagName: 'button',
  classNames: ['list-group-item-action'],

  click(event) {
    get(this, 'onClick')(event);
  },
  /**
   * Noop for actions
   * @return {[type]} [description]
   */
  onClick() {}
});
