import Component from '@ember/component';
import layout from '../../templates/components/card/card-header';
import Flexible from '../../mixins/flexable';


export default Component.extend(Flexible, {
  layout,
  classNames: ['card-header']
});
