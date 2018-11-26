import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  classNameBindings: ['flexClass', 'flexDirection'],
  flex: false,
  align: 'center',
  flexable: computed('flex', function () {
    return (this.get('flex'));
  }),
  flexClass: computed('flexable', function() {
    if (!this.get('flexable')) {
      return false;
    }

    return `d-flex`;
  }),
  flexDirection: computed('direction', function() {
    if (!this.get('flexable')) {
      return false;
    }

    return `justify-content-${this.get('direction')}`;
  })
});
