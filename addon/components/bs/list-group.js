import Component from '@ember/component';
import layout from '../../templates/components/bs/list-group';

export default Component.extend({
  layout,
  classNames: ['list-group'],
  classNameBindings: ['flush:list-group-flush'],
  tagName: 'ul',

  flush: false,
});
