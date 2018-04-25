import Component from '@ember/component';
import layout from '../../templates/components/bs/list-group';

export default Component.extend({
  layout,

  type: 'ul',
  flush: false,
  tagNameBinding: ['type'],
  classNamaes: ['list-group'],
  classNameBindings: ['flush:list-group-flush']
});
