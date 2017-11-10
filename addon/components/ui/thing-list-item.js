import Component from '@ember/component';
import layout from '../../templates/ui/thing-list-item';
import SlotsMixin from 'ember-block-slots';

export default Component.extend(SlotsMixin, {
  classNames: ['thing-list-item', 'clearfix'],
  layout
});
