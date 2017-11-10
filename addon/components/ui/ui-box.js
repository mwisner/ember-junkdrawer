import Component from '@ember/component';
import layout from '../../templates/ui/ui-box';
import SlotsMixin from 'ember-block-slots';

export default Component.extend(SlotsMixin, {
  layout,
  classNames: ['card']
});
