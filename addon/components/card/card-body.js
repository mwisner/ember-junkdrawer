import Component from '@ember/component';
import layout from '../../templates/components/card/card-body';
import Flexable from '../../mixins/flexable'

export default Component.extend(Flexable, {
  layout,
  classNames: ['card-body']
});
