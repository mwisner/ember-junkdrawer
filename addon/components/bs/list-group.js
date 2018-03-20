import Component from '@ember/component';
import layout from '../../templates/components/bs/list-group';

export default Component.extend({
  layout,

  /**
   * @public
   * @property
   * Control tag type, defaults as ul, 
   * available types are `div`, `ul`
   */
  type: 'ul',
  
  /**
   * @public
   * @property
   * control flush property
   */
  flush: false,
  tagNameBinding: ['type'],
  classNamaes: ['list-group'],
  classNameBindings: ['flush:list-group-flush']
});
